import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './layout/application';
import registerServiceWorker from './services/register-service-worker';
import './styles/app.css';
import 'typeface-roboto';

ReactDOM.render(
  <Application />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
