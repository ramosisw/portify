import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { config } from '../config';
import { userActions } from '../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const LoginLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to={config.homepage + "/login"} {...props} />
));




class AppBar extends React.Component {
  state = {
    userLoged : localStorage.getItem(config.loggedItem) ? true : false
  }

  componentDidMount() {
    if (this.state.userLoged) {
      this.props.dispatch(userActions.getMe());
    }
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.users);
    return (
      <div className={classes.root}>
        <MuiAppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Portify
            </Typography>
              {this.state.userLoged ?
                <Button color="inherit">{this.props.users.display_name}</Button> :
                <Button color="inherit" component={LoginLink}>Login</Button>
              }
            </Toolbar>
          </Container>
        </MuiAppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state;
  return {
    users
  };
}


AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(AppBar));
