import { Component } from '@nestjs/common';
import { appendFile, ensureFile, readFile, writeFile } from 'fs-extra';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { WriteStream, createWriteStream } from 'fs-extra';

const HOURS = [...Array(24).keys()].map(i => i < 10 ? `0${i}` : `${i}`);
const CSV_STORAGE_PATH = 'csv-storage';

@Component()
export class S3DownloaderService {

  private async _outputFileStream(date: string): Promise<string> {
    const fileName = `csv-storage/${date}.csv`;
    await ensureFile(fileName);
    return fileName;
  }

  private async _downloadPartials(date: string): Promise<boolean> {

    const partialDownloadPromises: Promise<void>[] = [];

    for (const hour of HOURS) {

      const remoteCSVFileName = `${date}/${date}_BINS_XEUR${hour}.csv`;
      const partialFileName = `${CSV_STORAGE_PATH}/${remoteCSVFileName}`;
      console.log(`Downloading: ${remoteCSVFileName}`);

      const url = `https://s3.eu-central-1.amazonaws.com/deutsche-boerse-eurex-pds/${remoteCSVFileName}`;

      const config: AxiosRequestConfig = {
        onDownloadProgress: progressEvent => console.log(progressEvent),
      };

      const promise = axios.get(url, config).then(async (response: AxiosResponse<string>) => {
        await ensureFile(partialFileName);
        writeFile(partialFileName, response.data);
      });
      partialDownloadPromises.push(promise);
    }

    try {
      await Promise.all(partialDownloadPromises);
      return Promise.resolve(true);
    } catch (e) {
      console.log(e.message);
      return Promise.resolve(false);
    }
  }

  private async _concatenatePartials(date: string) {
    const concatenatedFileStream = await this._outputFileStream(date);

    for (const hour of HOURS) {

      const remoteCSVFileName = `${date}/${date}_BINS_XEUR${hour}.csv`;
      const partialFileName = `${CSV_STORAGE_PATH}/${remoteCSVFileName}`;
      console.log(`Merging: ${partialFileName}`);

      try {
        const buffer = await readFile(partialFileName);
        await appendFile(concatenatedFileStream, buffer);
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  public async download(date: string) {
    console.time('partial download');
    const isPartialsDownloaded = await this._downloadPartials(date);
    console.timeEnd('partial download');
    console.log(isPartialsDownloaded);

    if (isPartialsDownloaded) {
      console.time('concatenate');
      await this._concatenatePartials(date);
      console.timeEnd('concatenate');
    }
  }
}