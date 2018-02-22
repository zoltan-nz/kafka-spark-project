import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './layout/app';
import registerServiceWorker from './services/register-service-worker';
import './styles/app.css';
import 'typeface-roboto';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
