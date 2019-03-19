import Paper from '@material-ui/core/Paper/Paper';
import axios from 'axios';
import * as React from 'react';
import { Component } from 'react';

enum ServerStatus {
  Online = 'Online',
  Offline = 'Offline',
}

interface IFooterStatus {
  serverStatus: ServerStatus;
  counter: number;
}

export default class Footer extends Component<{}, IFooterStatus> {
  public heartbeat: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      counter: 0,
      serverStatus: ServerStatus.Offline,
    };
  }

  public async checkServerStatus() {
    try {
      await axios.get('/api/heartbeat');
      this.setState(prevState => ({
        ...prevState,
        counter: prevState.counter + 1,
        serverStatus: ServerStatus.Online,
      }));
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        counter: prevState.counter + 1,
        serverStatus: ServerStatus.Offline,
      }));
    }
  }

  public componentDidMount() {
    this.heartbeat = window.setInterval(this.checkServerStatus.bind(this), 5000);
  }

  public componentWillUnmount() {
    clearTimeout(this.heartbeat);
  }

  public render() {
    return (
      <Paper className="paper" elevation={1}>
        Server status: {this.state.serverStatus}
      </Paper>
    );
  }
}
