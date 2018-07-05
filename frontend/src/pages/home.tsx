import { Component } from 'react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface IHomeState {}

interface IHomeProps extends RouteComponentProps<Component> {}

export default class Home extends Component<IHomeProps, IHomeState> {

  constructor(props: IHomeProps) {
    super(props);
  }

  render() {
    return (<h1>Home Page</h1>);
  }
}
