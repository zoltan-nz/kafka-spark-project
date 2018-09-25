import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './layout/app';
import registerServiceWorker from './services/register-service-worker';
import './styles/app.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
