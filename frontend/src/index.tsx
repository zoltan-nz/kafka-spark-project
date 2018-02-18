import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './layout/app';
import registerServiceWorker from './services/registerServiceWorker';
import './index.css';
import 'typeface-roboto';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
