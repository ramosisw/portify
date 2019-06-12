import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { history } from './helpers';
import { config } from './config';
import React from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import Login from './Login'
import Snackbar from '@material-ui/core/Snackbar';
import MessageSnackbar from './components/MessageSnackbar'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2ebd59",
    },
    //secondary: deepPurple
  },
  typography: {
    useNextVariants: true,
  },
  root: {
    display: 'flex',
  },
});

class App extends React.Component {
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
          <Route path={config.homepage + "/"}>
            <Switch>
              <Route path={config.homepage + "/login"} component={Login} />
              <Route path={config.homepage + "/"} component={Main} />
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
