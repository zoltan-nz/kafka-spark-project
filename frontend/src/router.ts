import { ComponentType } from 'react';
import Downloader from './routes/downloader';
import Home from './routes/home';
import Streamer from './routes/streamer';

interface IRoute {
  readonly exact?: boolean;
  readonly label: string;
  readonly path: string;
  readonly component: ComponentType;
}

export const homeRoute: IRoute = {
  exact: true,
  label: 'Home',
  path: '/',
  component: Home
};

export const downloaderRoute: IRoute = {
  label: 'Downloader',
  path: '/downloader',
  component: Downloader
};

export const streamerRoute: IRoute = {
  label: 'Streamer',
  path: '/streamer',
  component: Streamer
};

const routes: ReadonlyArray<IRoute> = [
  homeRoute,
  downloaderRoute,
  streamerRoute
];

export default routes;
