import RaisedButton from 'material-ui/RaisedButton';
import { Component, MouseEvent } from 'react';
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import Footer from './Footer';
import Axios from 'axios';

import './App.css';
import * as moment from 'moment';

const TITLE = 'Deutsche Borse Data Set Downloader';

interface AppProps {
  date: Date;
}

interface AppState {
  date: Date;
}

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      date: this.props.date
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar title={TITLE}/>
        <div className="container">
          <Paper className="paper center" zDepth={1}>
            <DatePicker
              value={this.state.date}
              onChange={(e, d) => this.updateDate(e, d)}
              hintText="Select a streaming date"
            />
            <RaisedButton label="Download" onClick={event => this.download(event)}/>
          </Paper>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }

  private download(event: MouseEvent<Object>) {
    event.preventDefault();
    const formattedDate = moment(this.state.date).format('YYYY-MM-DD');
    console.log(formattedDate); // tslint:disable-line:no-console
    Axios.post('/api/downloader', { date: formattedDate });
  }

  private updateDate(event: null, date: Date) {
    this.setState(prevState => ({ ...prevState, date }));
  }
}

export default App;
