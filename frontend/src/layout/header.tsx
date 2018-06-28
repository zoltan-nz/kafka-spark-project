import AppBar from '@material-ui/core/AppBar/AppBar';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import * as React from 'react';
import { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import routes from '../router';

interface HeaderProps {
  value: number;
}

interface HeaderStatus {
  value: number;
}

export default class Header extends Component<HeaderProps, HeaderStatus> {

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    return (
      <AppBar position="static" color="default">
        <Tabs value={this.state.value}>
          {
            routes.map((route, index) =>
              <Tab
                value={index}
                key={index}
                label={route.label}
                // containerElement={<NavLink exact={true} to={route.path} />}
              />
            )
          }
        </Tabs>
      </AppBar>
    );
  }
}
