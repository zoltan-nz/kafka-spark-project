import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SelectDate from '../components/select-date';

interface IDownloaderProps extends RouteComponentProps<{}> {}

export default class Downloader extends Component<IDownloaderProps> {
  public render() {
    return <SelectDate />;
  }
}
