import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';
import * as React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../router';

export default class Header extends Component<{}> {

  render() {
    return (
      <Tabs>
        {
          routes.map((route, index) =>
            <Tab
              key={index}
              label={route.label}
              containerElement={<NavLink to={route.path} />}
            />
          )
        }
      </Tabs>
    );
  }
}
