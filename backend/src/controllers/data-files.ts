import { Controller, Get } from '@nestjs/common';
import { readdir } from 'fs-extra';
import { resolve } from 'path';
import { cwd } from 'process';

const CSV_STORAGE_DIRECTORY_NAME = 'csv-storage';

const csvFiles = async (): Promise<string[]> => {
  let fileList: string[] = [];
  let filteredFileList: string[] = [];

  try {
    fileList = await readdir(resolve(cwd(), CSV_STORAGE_DIRECTORY_NAME));
  } catch (e) {
    console.log(e.message);
  }

  if (fileList) {
    filteredFileList = fileList.filter(file => file.match(/.csv$/));
  }

  return filteredFileList;
};

@Controller('api/data-files')
export class DataFiles {

  @Get()
  async findAll() {
      const files: string[] = await csvFiles();
      return JSON.stringify(files);
  }
}