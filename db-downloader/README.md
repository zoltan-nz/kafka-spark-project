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

### Create backend API

```
$ git clone https://github.com/nestjs/typescript-starter.git db-downloader-backend
$ cd db-downloader-backend
$ rm -rf .git
$ npm i
```

development
```
$ npm run start
```

watch mode
```
$ npm run start:dev
$ open http://localhost:3000
```

production mode
```
npm run start:prod
```

### Changing development port

Changing the start script in frontend package.json: `"start": "PORT=3001 react-scripts-ts start"`

## Documentation

* [API framework, Nest.js original README](db-downloader-backend/FRAMEWORK_README.md)
* [Frontend framework, React.js original README](db-downloader-frontend/FRAMEWORK_README.md)
* [Backend documentation](db-downloader-backend/README.md)
* [Frontend documentation](db-downloader-frontend/README.md)