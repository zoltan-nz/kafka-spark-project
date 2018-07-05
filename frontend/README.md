# Frontend


Implementation steps:

- [x] Add material design
- [x] Check backend availability
- [x] Add calendar widget
- [x] Send the selected date to the backend

## Material Design

Popular Material Design Addon: [Material-UI](http://www.material-ui.com/#/)

```
$ npm i -S material-ui typeface-roboto
$ npm i -D @types/material-ui
```

Add `import 'typeface-roboto';` to `src/index.tsx`.

Simple material button in `App.tsx`:

```typescript jsx
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <RaisedButton label="Default"/>
      </MuiThemeProvider>
    );
  }
}

export default App;
```

* State and Prop management
* Change event
* Click event
* Ajax library

## Add Footer and check server status

* Create a new component: `Footer`
* Using `axios` to check server availability.

## Restructuring default layout

* Separate code in subfolders.
* Update Material UI

## Add router

* react-router v4

## Docker build

* Using `nginx:alpine`
* Add nginx configuration

```
$ docker build -t zoltannz/kafka-spark-project-frontend .
```

## Using React Router with TypeScript

Challenges:

* How can we access to the actual route pathname? We need this information to setup the default Tab value.
* How can we redirect, navigate to other page if we click on a Tab?

### Accessing Route properties

React Router provide a handful list of properties what you can use in your components.

Using these properties, we have to extend our component interface with `RouteComponentProps`.

So the first step to create an interface and use it in your class declaration. Using this property type, we can create our class. However there is an other important step also, we have to use a wrapper function before we export our component:

```typescript jsx
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';

interface HeaderProps extends RouteComponentProps<{}> {}

class Header extends Component<HeaderProps> {}

export default withRouter(Header);
``` 

After this orchestration, we have access to `location` property inside our component, so we can use the actual pathname where we need using `this.props.location.pathname`.

### Linking to other page using Tabs from Material UI

Material UI has a `Tab` component. This component has an `onClick` handler. Using the `history` api, we can navigate to other page programmatically. (We store an array of route in `routes` constant, so we can use this to render a list of tab in the header.)

```typescript jsx
import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IRoute, routes } from '../router';

interface HeaderProps extends RouteComponentProps<{}> {}

class Header extends Component<HeaderProps> {

  render() {
    return (
      <AppBar position="static" color="primary">
        <Tabs value={this.props.location.pathname}>
          {
            routes.map((route, index) =>
              <Tab
                value={route.path}
                key={index}
                label={route.label}
                onClick={event => this.handleTabClick(event, route)}
              />
            )
          }
        </Tabs>
      </AppBar>
    );
  }

  private handleTabClick(event: MouseEvent, route: IRoute) {
    this.props.history.push(route.path);
  }
}

export default withRouter(Header);

```
