import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../styles/app.css';
import Main from './main';

const theme = createMuiTheme();

class App extends Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Main />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
