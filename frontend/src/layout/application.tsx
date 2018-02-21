import * as React from 'react';
import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Downloader from '../routes/downloader';
import Home from '../routes/home';
import Streamer from '../routes/streamer';
import Footer from './footer';

import '../styles/app.css';
import Header from './header';

interface IApp {}

class Application extends Component<IApp, IApp> {

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <Header />
          <div className="container">
            <Route path={'/'} exact={true} component={Home} />
            <Route path={'/downloader'} component={Downloader} />
            <Route path={'/streamer'} component={Streamer} />
            <Footer />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>

    );
  }
}

export default Application;
