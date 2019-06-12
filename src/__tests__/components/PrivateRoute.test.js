import PrivateRoute from '../../components/PrivateRoute';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router-dom';
import { history } from '../../helpers';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Router history={history}>
            <PrivateRoute />
        </Router>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});