import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'
import { createMuiTheme } from '@material-ui/core';
import { history } from './helpers';
import { config } from './config';
import React from 'react';
import Main from './Main';
import Login from './Login'

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

export default class App extends React.Component {
  render() {
    console.log(config);
    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <Route path={config.homepage + "/"}>
            <Switch>
              <Route path={config.homepage + "/login"} component={Login} />
              <PrivateRoute path={config.homepage + "/"} component={Main} />
            </Switch>
          </Route>
        </MuiThemeProvider>
      </Router>
    );
  }
};