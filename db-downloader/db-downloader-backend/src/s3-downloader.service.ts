import { Component } from '@nestjs/common';

@Component()
export class S3DownloaderService {}

// const aws = require('aws-sdk');
// const fs = require('fs');
//
// const s3 = new aws.S3();

// const params = {
//   Bucket: 'deutsche-boerse-eurex-pds',
//   MaxKeys: 1000,
// };
//
// s3.listObjectsV2(params, (err, data) => {
//   if (err) console.log(err.stack);
//
//   const keys = data["Contents"].map(d => d.Key);
//   console.log(keys);
//   // console.log(data)
// });

// const options = {
//   Bucket: 'deutsche-boerse-eurex-pds',
//   Key: '2017-05-01/2017-05-01_BINS_XEUR12.csv'
// };
//
// const fileStream = s3.getObject(options).createReadStream();
// const writeStream = fs.createWriteStream('save.csv');
// fileStream.pipe(writeStream);
