import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IStreamerState {}

interface IStreamerProps extends RouteComponentProps<Component> {}

export default class Streamer extends Component<IStreamerProps, IStreamerState> {

  constructor(props: IStreamerProps) {
    super(props);
  }

  componentDidMount() {
    console.log('hello');
  }

  render() {
    return (<h1>Streamer Page</h1>);
  }
}
