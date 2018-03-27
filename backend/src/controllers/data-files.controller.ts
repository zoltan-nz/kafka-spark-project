import { Body, Controller, Get, Post } from '@nestjs/common';
import { createReadStream, readdir } from 'fs-extra';
import { resolve } from 'path';
import { cwd } from 'process';
import * as KafkaNode from 'kafka-node';
import { ProducerStreamOptions } from 'kafka-node';
import { Transform } from 'stream';

interface FileDto {
  fileName: string;
}

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
export class DataFilesController {

  @Get()
  async findAll() {
    const files: string[] = await csvFiles();
    return JSON.stringify(files);
  }

  @Post()
  async startStreaming(@Body() payload: FileDto) {
    const fileName = payload.fileName;
    console.log('Start streaming...', fileName);
    console.log('KAFKA_CONNECT:', process.env.KAFKA_CONNECT);

    const producerStreamOptions: ProducerStreamOptions = {
      kafkaClient: {
        kafkaHost: process.env.KAFKA_CONNECT || 'http://localhost:9092',
      },
    };
    const kafkaServiceStream = new KafkaNode.ProducerStream(producerStreamOptions);

    const csvTransform = new Transform({
      highWaterMark: 100,
      objectMode: true,
      decodeStrings: true,
      transform(text, encoding, callback) {
        console.log(`pushing message ${text} to boerse.dev topic`);
        callback(null, {
          topic: 'boerse.dev',
          messages: text,
        });
      },
    });

    try {
      createReadStream(resolve(cwd(), CSV_STORAGE_DIRECTORY_NAME, fileName), { highWaterMark: 100 })
        .pipe(csvTransform)
        .pipe(kafkaServiceStream);

    } catch (e) {
      console.error('Read Stream Error', e);
    }

  }
}
