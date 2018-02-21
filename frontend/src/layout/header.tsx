import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';
import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';

interface IHeader {}

export default class Header extends Component<IHeader, IHeader> {

  render() {
    return (
      <Tabs>
        <Tab label="Home" containerElement={<NavLink to="/" />} />
        <Tab label="Downloader" containerElement={<NavLink to="/downloader" />} />
        <Tab label="Streamer" containerElement={<NavLink to="/streamer" />} />
      </Tabs>
    );
  }
}
