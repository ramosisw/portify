import { Redirect, Route } from 'react-router-dom';
import React, { Component } from 'react'
import { config } from '../config';
import queryString from 'query-string';

export default class PrivateRoute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props;
        const hashValues = queryString.parse(this.props.location.hash);
        if (!localStorage.getItem(config.loggedItem) && hashValues.access_token) {
            localStorage.setItem(config.loggedItem, JSON.stringify({
                ...hashValues
            }));
            const target = window.self === window.top ? window.opener : window.parent;
            target.postMessage("");
        }
        return <Route {...rest} render={props => (
            /*isAuthenticated*/
            localStorage.getItem(config.loggedItem) ? (
                <Component {...rest} {...props} >
                    {props.children}
                </Component>
            ) : (
                    <Redirect to={config.homepage + '/login' + props.location.search} />
                )
        )
        } />;
    }
}
