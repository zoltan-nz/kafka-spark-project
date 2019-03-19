import Axios, { AxiosResponse } from 'axios';
import { Component, MouseEvent } from 'react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IStreamerState {
  files: string[];
}

interface IStreamerProps extends RouteComponentProps<{}> {
  files: string[];
}

export default class Streamer extends Component<IStreamerProps, IStreamerState> {
  constructor(props: IStreamerProps) {
    super(props);
    this.state = { files: this.props.files || [] };
  }

  public async componentDidMount() {
    const response: AxiosResponse<string[]> = await Axios.get<string[]>('http://localhost:3000/api/data-files');
    const files: string[] = response.data;
    this.setState(prevState => ({ ...prevState, files }));
  }

  public render() {
    return (
      <div>
        <h1>Streamer Page</h1>
        <ul>
          {this.state.files.map((file, i) => (
            <li key={i}>
              <a
                href="#"
                onClick={
                  /* tslint:disable-next-line:jsx-no-lambda */
                  e => this.handleFileClick(e, file)
                }
              >
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  private handleFileClick(event: MouseEvent<{}>, fileName: string) {
    event.preventDefault();
    Axios.post('/api/data-files', { fileName });
  }
}
