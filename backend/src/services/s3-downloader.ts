import { Component } from '@nestjs/common';
import { appendFile, ensureFile, readFile, writeFile } from 'fs-extra';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const HOURS = [...Array(24).keys()].map(num => num.toString().padStart(2, '0'));
const CSV_STORAGE_PATH = 'csv-storage';

const HEADER_LINE =
  'ISIN,MarketSegment,UnderlyingSymbol,UnderlyingISIN,Currency,SecurityType,MaturityDate,StrikePrice,PutOrCall,MLEG,' +
  'ContractGenerationNumber,SecurityID,Date,Time,StartPrice,MaxPrice,MinPrice,EndPrice,NumberOfContracts,NumberOfTrades\n';

@Component()
export default class S3Downloader {

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

        const dataWithoutFirstLine = response.data.substring(response.data.indexOf('\n') + 1);

        await ensureFile(partialFileName);
        await writeFile(partialFileName, dataWithoutFirstLine);
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
    await appendFile(concatenatedFileStream, HEADER_LINE);

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
