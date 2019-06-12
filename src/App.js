import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MessageSnackbar from './components/MessageSnackbar';
import { Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { alertActions } from './actions';
import { connect } from 'react-redux';
import { history } from './helpers';
import Login from './Login'
import React from 'react';
import Main from './Main';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#000",
      contrastText: "#fff"
    },
    secondary: {
      main: "#2ebd59",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true,
  },
  root: {
    display: 'flex',
  },
});

class App extends React.Component {

  handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.dispatch(alertActions.clear());
  };

  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          {alert.message &&
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open
              onClose={alert.onClose || this.handleClose}
              autoHideDuration={2000}
            >
              <MessageSnackbar
                onClose={alert.onClose || this.handleClose}
                variant={alert.type}
                message={alert.message}
                onUndo={alert.onUndo}
              />
            </Snackbar>
          }
          <Route path={"/"}>
            <Switch>
              <Route path={"/login"} component={Login} />
              <Route path={"/"} component={Main} />
            </Switch>
          </Route>
        </MuiThemeProvider>
      </Router>
    );
  }
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as App };
