import Paper from 'material-ui/Paper';
import { Component } from 'react';
import * as React from 'react';
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

  async checkServerStatus() {
    try {
      await axios.get('http://localhost:3000/api/heartbeat');
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

  constructor(props: FooterProps) {
    super(props);
    this.state = {
      serverStatus: ServerStatus.Offline,
      counter: 0
    };
  }

  componentDidMount() {
    this.heartbeat = window.setInterval(this.checkServerStatus.bind(this), 1000);
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
