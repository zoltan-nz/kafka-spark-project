import { ComponentType } from 'react';
import Downloader from './pages/downloader';
import Home from './pages/home';
import Streamer from './pages/streamer';

export interface IRoute {
  readonly exact: boolean;
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
  exact: true,
  label: 'Downloader',
  path: '/downloader',
  component: Downloader
};

export const streamerRoute: IRoute = {
  exact: true,
  label: 'Streamer',
  path: '/streamer',
  component: Streamer
};

export const routes: ReadonlyArray<IRoute> = [
  homeRoute,
  downloaderRoute,
  streamerRoute
];
