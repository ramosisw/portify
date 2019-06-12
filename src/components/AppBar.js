import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { userActions } from '../actions';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { config } from '../config';
import PropTypes from 'prop-types';
import React from 'react';

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
  toolbarTitle: {
    //flex: 1,
    marginRight: 10
  },
});

const LoginLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} to={"/login"} {...props} />
));

class AppBar extends React.Component {
  state = {
    userLoged: localStorage.getItem(config.loggedItem) ? true : false
  }

  componentDidMount() {
    if (this.state.userLoged) {
      this.props.dispatch(userActions.getMe());
    }
  }

  onNoMe() {

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MuiAppBar position={"static"}>
          <Container>
            <Toolbar>
              <Typography variant={"h6"} className={classes.title}>
                Portify
              </Typography>
              {this.state.userLoged &&
                <Typography component={"p"}
                  color={"inherit"}
                  align={"center"}
                  noWrap
                  className={classes.toolbarTitle}
                >
                  {this.props.users.display_name}
                </Typography>
              }
              {this.state.userLoged ?
                <Link
                  component={LoginLink}
                  variant={"body2"}
                  color={"inherit"}
                  onClick={this.onNoMe}
                >
                  It's no me
                </Link> :
                <Button color={"inherit"} component={LoginLink} size={"small"}>Login</Button>
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
