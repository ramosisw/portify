import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react'
import queryString from 'query-string';
import { config } from './config'

const style = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing(),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
});
let authWindow;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            logged: false
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onAuthorize = this.onAuthorize.bind(this);
        this.onCallback = this.onCallback.bind(this);
        localStorage.removeItem(config.loggedItem);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.addEventListener("message", this.onCallback);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    onCallback() {
        if (authWindow)
            authWindow.close();
        if (localStorage.getItem(config.loggedItem))
            this.setState({ logged: true });
    }

    onAuthorize() {
        const width = 500, height = 780;
        const left = (this.state.width / 2) - (width / 2);
        const top = (this.state.height / 2) - (height / 2);
        const set = {
            client_id: config.spotifyApi.client_id,
            redirect_uri: config.spotifyApi.redirect_uri,
            scope: config.spotifyApi.scope,
            response_type: 'token',
            show_dialog: 'true'
        };

        authWindow = window.open(
            "https://accounts.spotify.com/authorize?" + queryString.stringify(set),
            "Spotify",
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
    }

    render() {
        if (this.state.logged) {
            return <Redirect to={'/'} />
        }
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar} color={"primary"}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant={"h5"}>We need your Authorization</Typography>
                        <Button
                            onClick={this.onAuthorize}
                            fullWidth
                            variant={"contained"}
                            color={"secondary"}
                            className={classes.submit}>
                            Proced to Authorization
                        </Button>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(style)(Login);
