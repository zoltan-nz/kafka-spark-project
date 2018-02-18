import * as React from 'react';
import { Component } from 'react';
import AppBar from 'material-ui/AppBar';

const TITLE = 'Deutsche Borse Data Set Downloader';

interface IHeader {}

export default class Header extends Component<IHeader, IHeader> {

  render() {
    return (
      <AppBar title={TITLE} />
    );
  }
}
