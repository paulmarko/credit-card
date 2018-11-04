import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    height:'5px',
  },
  inner: {
      height:'5px',
      backgroundColor:'red',
  },
  colorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  barColorPrimary: {
    backgroundColor: '#00695C',
  },
};

class TransactionProgress extends Component {
    state = {
        opacity: 1,
    };
    render(){
        const { classes, progressBarState } = this.props;
        return (
        <div className={classes.root}>
        {progressBarState && 
            <div className={classes.inner} style={{opacity:(this.state.opacity)}}></div>
        }
        </div>
        );
    }
}

TransactionProgress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionProgress);