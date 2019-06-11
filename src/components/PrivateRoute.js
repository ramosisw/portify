import { Redirect, Route } from 'react-router-dom';
import React, { Component } from 'react'
import { config } from '../config';

export default class PrivateRoute extends Component {

    render() {
        const { component: Component, ...rest } = this.props;
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
