import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'typeface-roboto';

ReactDOM.render(
  <App date={new Date()} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
