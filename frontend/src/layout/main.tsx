import * as React from 'react';
import { Component } from 'react';
import { Route } from 'react-router';
import routes from '../router';
import '../styles/app.css';
import Header from './header';

export default class Main extends Component<{}> {
  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          {routes.map((route, i) =>
            <Route key={i} exact={route.exact} path={route.path} component={route.component} />
          )}
        </div>
      </div>
    );
  }
}
