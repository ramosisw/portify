import CloudDownload from '@material-ui/icons/CloudDownload';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CssBaseline from '@material-ui/core/CssBaseline';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from './components/AppBar';
import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { config } from './config';
import { alertActions, userActions } from './actions'

const styles = theme => ({
    appBarSpacer: {
        marginTop: theme.spacing(2),
    },
    options: {
        marginTop: theme.spacing(5),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
});

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userLoged: localStorage.getItem(config.loggedItem) ? true : false
        };

        const hashValues = queryString.parse(this.props.location.hash);

        if (!localStorage.getItem(config.loggedItem) && hashValues.access_token) {
            localStorage.setItem(config.loggedItem, JSON.stringify({
                ...hashValues
            }));
            const target = window.self === window.top ? window.opener : window.parent;
            target.postMessage("");
        }
    }

    onExport = () => {
        this.props.dispatch(alertActions.info("Exporting data..."));
        this.props.dispatch(userActions.exportData());
    }

    onImport = () => {
        this.props.dispatch(alertActions.info("import!"));
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
                        <Container>
                            <Typography variant={"h2"} align={"center"}>Welcome to Portify.</Typography>
                            <Typography variant={"h5"} component={"p"} align={"center"}>Export/Import your playlists from Spotify with json file.</Typography>
                            {this.state.userLoged &&
                                <Grid className={classes.options} container direction={"column"} alignItems={"center"}>
                                    <Grid item>
                                        <ButtonGroup
                                            size={"large"}
                                            variant={"contained"}
                                            aria-label={"Options"}
                                            color={"secondary"}
                                        >
                                            <Button onClick={this.onExport}>
                                                Export
                                                <CloudDownload className={classes.rightIcon} />
                                            </Button>
                                            <Button onClick={this.onImport}>
                                                <CloudUpload className={classes.leftIcon} />
                                                Import
                                            </Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            }
                        </Container>
                    </main>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { users } = state;
    return { users };
}

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(mapStateToProps)(Main));
