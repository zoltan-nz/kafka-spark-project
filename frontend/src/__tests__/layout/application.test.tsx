import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from '../../layout/application';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Application />, div);
});
