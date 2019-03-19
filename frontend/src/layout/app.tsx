import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../styles/app.css';
import Main from './main';

const theme = createMuiTheme();

class App extends Component<{}> {
  public render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Main />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
