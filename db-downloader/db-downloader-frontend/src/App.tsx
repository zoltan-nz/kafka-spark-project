import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import Axios from 'axios';

import './App.css';

const TITLE = 'Deutsche Borse Data Set Downloader';

interface AppProps {
  date: Date;
}

interface AppState {
  date: Date;
}

class App extends React.Component<AppProps, AppState> {

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
        <Paper className="paper" zDepth={1}>
          <DatePicker
            value={this.state.date}
            onChange={(e, d) => this.updateDate(e, d)}
            hintText="Select a streaming date"
          />
          <RaisedButton label={'Download'} onClick={event => this.download(event)}/>
        </Paper>
      </MuiThemeProvider>
    );
  }

  private download(event: React.MouseEvent<Object>) {
    event.preventDefault();
    console.log(this.state.date); // tslint:disable-line:no-console
    Axios.post('/api/download-date', { date: this.state.date });
  }

  private updateDate(event: null, date: Date) {
    this.setState((prevState, props) => ({ ...prevState, date }));
  }
}

export default App;
