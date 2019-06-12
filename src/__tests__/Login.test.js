import ReactDOM from 'react-dom';
import Login from '../Login';
import React from 'react';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
    ReactDOM.unmountComponentAtNode(div);
});