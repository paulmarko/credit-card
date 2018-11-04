import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import NotificationPopup from './NotificationPopup';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bankTitle: {
    paddingRight:'80px',
    display: 'block',
    fontSize:'13px',
    [theme.breakpoints.up('sm')]: {
      fontSize:'20px',
      paddingRight:'5px',
    },
  },
  bankMainNav: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  mainNavButton : {
    color:'#fff',
    marginLeft:'15px',
  },
});

const ITEM_HEIGHT = 48;

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorElHamburger: null,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleClickHamburger = event => {
    this.setState({ anchorElHamburger: event.currentTarget });
  };

  handleCloseHamburger = () => {
    this.setState({ anchorElHamburger: null });
  };

  render() {
    const { anchorEl, anchorElHamburger, mobileMoreAnchorEl } = this.state;
    const { classes, pusherMessageJson, clearAlerts } = this.props;
    const isHamburgerOpen = Boolean(anchorElHamburger);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenuMain = (
      <Menu
          id="hamburger-menu"
          TransitionComponent={Fade}
          anchorEl={anchorElHamburger}
          open={isHamburgerOpen}
          onClose={this.handleCloseHamburger}
          PaperProps={{
              style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
              },
          }}
          >
            <MenuItem onClick={this.handleCloseHamburger}>Credit Card Transactions</MenuItem>
          ))}
      </Menu>
    );
  
    
    const renderMenuAccount = (
      <Menu
        anchorEl={anchorEl}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenuAccount = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          {/*BADGE MOBILE */}
          <NotificationPopup
                clearAlerts={clearAlerts}
                pusherMessageJson={pusherMessageJson}
          />
        </MenuItem>
        {/*
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </MenuItem>
        */}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar 
            position="static"
        >
          <Toolbar>
          {/* MOBILE */}
          <div className={classes.sectionMobile}>
              <IconButton 
                  className={classes.menuButton} 
                  color="inherit" 
                  aria-label="Main Navigation"
                  aria-owns={isHamburgerOpen ? 'hamburger-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClickHamburger}
              >
                <MenuIcon />
              </IconButton>
          </div>
            
            <Typography className={classes.bankTitle} variant="h6" color="inherit" noWrap>
              Bank Of Unlimited
            </Typography>
            <div className={classes.bankMainNav}>
              <Button color="secondary" className={classes.mainNavButton}>Credit Card</Button>
            </div>
            <div className={classes.grow} />
            {/* DESKTOP */}
            <div className={classes.sectionDesktop}>
              {/*BADGE DESKTOP */}
              <NotificationPopup
                clearAlerts={clearAlerts}
                pusherMessageJson={pusherMessageJson}
              />
              {/*
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              */}
            </div>
            {/* MOBILE */}
            <div className={classes.sectionMobile}>
              <IconButton 
                  aria-haspopup="true" 
                  onClick={this.handleMobileMenuOpen} 
                  color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenuMain}
        {renderMenuAccount}
        {renderMobileMenuAccount}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);