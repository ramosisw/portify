import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const LoginLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/login" {...props} />
));


export default function AppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiAppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Portify
            </Typography>
            <Button color="inherit" component={LoginLink}>Login</Button>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </div>
  );
}