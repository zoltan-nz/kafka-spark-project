import * as React from 'react';
import { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import Main from './main';
import '../styles/app.css';

class App extends Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </BrowserRouter>

    );
  }
}

export default App;
