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
  component: Home,
  exact: true,
  label: 'Home',
  path: '/',
};

export const downloaderRoute: IRoute = {
  component: Downloader,
  exact: true,
  label: 'Downloader',
  path: '/downloader',
};

export const streamerRoute: IRoute = {
  component: Streamer,
  exact: true,
  label: 'Streamer',
  path: '/streamer',
};

export const routes: ReadonlyArray<IRoute> = [homeRoute, downloaderRoute, streamerRoute];
