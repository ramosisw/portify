import React from 'react';
import { createMuiTheme } from '@material-ui/core'
import AppBar from './components/AppBar'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    //primary: blue,
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
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <div className={theme.root}>
            <AppBar />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
