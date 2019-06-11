import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import AppBar from './components/AppBar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { config } from './config';

class Main extends Component {
    constructor(props){
        super(props);
        const hashValues = queryString.parse(this.props.location.hash);
        if (!localStorage.getItem(config.loggedItem) && hashValues.access_token) {
            localStorage.setItem(config.loggedItem, JSON.stringify({
                ...hashValues
            }));
            const target = window.self === window.top ? window.opener : window.parent;
            target.postMessage("");
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div>
                    <AppBar />
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />

                    </main>
                </div>
            </React.Fragment>
        )
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles({})(Main));