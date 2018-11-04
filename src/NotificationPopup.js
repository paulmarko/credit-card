import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import BellNotifyIcon from '@material-ui/icons/Notifications';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding:0,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class NotificationPopup extends React.Component {
  constructor() {
    super()
    this.handleDismissAlerts = this.handleDismissAlerts.bind(this)
  }

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  // call 2 functions with one click
  handleDismissAlerts = () => {
    this.props.clearAlerts();
    this.handleClose();
  }

  render() {
    const { classes, pusherMessageJson } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const rows = pusherMessageJson.map((row, index) => {
      return (
        <ListItemText style={{paddingLeft:'15px'}} key={index} primary={row.result} />
      );
    });

    return (
      <div>
        <IconButton color="inherit"
          aria-owns={open ? 'simple-popper' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {pusherMessageJson.length > 0 ? (
            <Badge 
              badgeContent={pusherMessageJson.length} 
              color="secondary"
            >
              <BellNotifyIcon />
            </Badge>
          ) : (
              <BellNotifyIcon />
          )}
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          
          {pusherMessageJson.length > 0 ? (
            <div className={classes.root}>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={this.handleDismissAlerts}
                className={classes.button}
              >Dismiss All Alerts</Button>
              <List>{rows}</List>
            </div>
          ) : (
            <Typography className={classes.typography}>
            No alerts at this time.
            </Typography>
          )}
          
        </Popover>
      </div>
    );
  }
}

NotificationPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationPopup);