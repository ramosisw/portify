import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    success: {
        backgroundColor: green[600],
        color: theme.palette.primary.contrastText
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.primary.contrastText
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText
    },
    undo: {
        backgroundColor: grey[900],
        color: theme.palette.getContrastText(grey[800]),
    },
    undoButton :{
        color : theme.palette.secondary.contrastText
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(),
    },
    close: {
        padding: theme.spacing() / 2,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class MessageSnackbar extends React.Component {


    render() {
        const { classes, className, message, onClose, variant, onUndo, ...other } = this.props;
        const Icon = variantIcon[variant];

        return (
            <SnackbarContent
                className={classNames(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        {Icon && <Icon className={classNames(classes.icon, classes.iconVariant)} />}
                        {message}
                    </span>
                }
                action={[
                    onUndo && <Button key={"undo"} className={classes.undoButton} size={"small"} onClick={onUndo}>
                        UNDO
                    </Button>,
                    <IconButton
                        key={"close"}
                        aria-label={"Close"}
                        color={"inherit"}
                        className={classes.close}
                        onClick={onClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
                {...other}
            />
        );
    }
}

MessageSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info', 'undo']).isRequired,
};

export default withStyles(styles)(MessageSnackbar);