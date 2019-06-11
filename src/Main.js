import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from 'react';
import AppBar from './components/AppBar';

export default class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <div>
                    <AppBar />
                </div>
            </React.Fragment>
        )
    }
}
