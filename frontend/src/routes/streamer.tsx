import Axios, { AxiosResponse } from 'axios';
import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IStreamerState {
  files: string[];
}

interface IStreamerProps extends RouteComponentProps<Component> {
  files: string[];
}

export default class Streamer extends Component<IStreamerProps, IStreamerState> {

  constructor(props: IStreamerProps) {
    super(props);
    this.state = { files: this.props.files || []};
  }

  async componentDidMount() {
    const response: AxiosResponse<string[]> = await Axios.get<string[]>('/api/data-files');
    const files: string[] = response.data;
    this.setState(prevState => ({ ...prevState, files }));
  }

  render() {
    return (
      <div>
        <h1>Streamer Page</h1>
        <ul>
          {this.state.files.map((file, i) => <li key={i}>{file}</li>)}
        </ul>
      </div>
    );
  }
}
