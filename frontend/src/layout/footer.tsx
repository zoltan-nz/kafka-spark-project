import Paper from 'material-ui/Paper';
import * as React from 'react';
import { Component } from 'react';
import axios from 'axios';

enum ServerStatus {
  Online = 'Online',
  Offline = 'Offline'
}

interface FooterProps {

}

interface FooterStatus {
  serverStatus: ServerStatus;
  counter: number;
}

export default class Footer extends Component<FooterProps, FooterStatus> {

  heartbeat: number;

  constructor(props: FooterProps) {
    super(props);
    this.state = {
      serverStatus: ServerStatus.Offline,
      counter: 0
    };
  }

  async checkServerStatus() {
    try {
      await axios.get('/api/heartbeat');
      this.setState(prevState => ({
        ...prevState,
        serverStatus: ServerStatus.Online,
        counter: prevState.counter + 1
      }));
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        serverStatus: ServerStatus.Offline,
        counter: prevState.counter + 1
      }));
    }
  }

  componentDidMount() {
    this.heartbeat = window.setInterval(this.checkServerStatus.bind(this), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.heartbeat);
  }

  render() {
    return (
      <Paper className="paper" zDepth={1}>
        Server status: {this.state.serverStatus}
      </Paper>
    );
  }
}
