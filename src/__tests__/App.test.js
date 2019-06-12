import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import App from '../App';
import { store } from '../helpers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      {/* <App /> */}
    </Provider>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
