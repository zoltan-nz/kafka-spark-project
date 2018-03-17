# DB Downloader Frontend API

Next steps:
* Add material design
* Check backend availability
* Add calendar widget
* Send the selected date to the backend

## Material Design

Popular Material Design Addon: [Material-UI](http://www.material-ui.com/#/)

```
$ npm i -S material-ui typeface-roboto
$ npm i -D @types/material-ui
```

Add `import 'typeface-roboto';` to `src/index.tsx`.

Simple material button in `App.tsx`:

```
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

```
$ docker build -t zoltannz/kafka-spark-project-frontend .

```
