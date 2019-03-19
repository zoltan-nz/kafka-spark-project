import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IHomeProps extends RouteComponentProps<{}> {}

export default class Home extends Component<IHomeProps, {}> {
  constructor(props: IHomeProps) {
    super(props);
  }

  public render() {
    return <h1>Home Page</h1>;
  }
}
