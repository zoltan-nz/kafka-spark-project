# Deutsche Boerse Public Dataset Downloader

> Data source: https://aws.amazon.com/public-datasets/deutsche-boerse-pds/

The main goal of this service that user can select a day and the selected day's data will be streamed by a Streaming Service. 

## Backend

Requirements:
 
* Download the directory of the csv files
* Download the selected for streaming
* Downloaded raw datafiles will be stored in Volume instance inside a Kubernetes cluster

Backend framework: [Nest.js](https://nestjs.com/) with TypeScript

## Frontend

* Select a date for streaming

Frontend framework: [React.js with TypeScript](https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/template/README.md)

## Implementation Log


### Create frontend app

```
$ npm install -g create-react-app
$ create-react-app db-downloader-frontend --scripts-version=react-scripts-ts
```

Start frontend app

```
$ cd ./db-downloader-frontend
$ npm start
```

Next steps:
* Add material design
* Add calendar widget
* Send the selected date to the backend