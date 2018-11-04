import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TimeIcon from '@material-ui/icons/AccessTime';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  root: {
    minWidth: 250,
    maxWidth: '100%', 
    height: '90px',
  },
  inner:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    /*flex-flow: shorthand for flex-direction, flex-wrap */
    justifyContent: 'space-evenly',
    alignItems:'flex-start',
    alignContent:'flex-start',
    height: '90px',
    backgroundImage: 'linear-gradient(to right, #2f2d8a, #3f51b5)',
  },
  subhead: {
    paddingTop:'17px',
    color:'#DCF1FF',
  },
  head: {
    color:'#DCF1FF',
  },
  box1: {
    width:'10%',
    order: '1',
    flexGrow: '1',
    paddingTop:'13px',
    textAlign:'right',
    color:'#DCF1FF',
  },
  box2: {
    width:'30%',
    order: '2',
    flexGrow: '1',
    textAlign:'center',
  },
  box3: {
    width:'30%',
    order: '3',
    flexGrow: '1',
    textAlign:'center',
  },
  box4: {
    width:'30%',
    order: '4',
    flexGrow: '1',
    textAlign:'center',
  },
});

function TimeStampToJSDateMDY(dateString) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    var dateOptions = {  year: 'numeric', month: 'long', day: 'numeric'};
    var d = new Date(dateString);
    if (d === 'Invalid Date') {
        return '';
    }
    var dateVal = d.toLocaleDateString("en-US", dateOptions); 
    return dateVal;
}

function numberFormat (num) {
    return num.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

class AccountOverview extends React.Component {
    render(){
        const { classes, lastPaymentTS, lastBalanceAmount } = this.props;
        return (
        <Paper className={classes.root}>
            <div className={classes.inner}>
                   <div className={classes.box1}>
                      <TimeIcon style={{fontSize: '60px'}} />
                   </div>
                   <div className={classes.box2}>
                   <Typography className={classes.subhead} variant="body1">
                        Welcome Back
                    </Typography>
                    <Typography className={classes.head} variant="h6">
                        Thomas
                    </Typography>
                   </div>
                   <div className={classes.box3}>
                   <Typography className={classes.subhead} variant="body1">
                        Last Payment
                    </Typography>
                    <Typography className={classes.head} variant="h6">
                        {TimeStampToJSDateMDY(lastPaymentTS)}
                    </Typography>
                        
                   </div>
                   <div className={classes.box4}>
                   <Typography className={classes.subhead} variant="body1">
                        Current Balance
                    </Typography>
                    <Typography className={classes.head} variant="h6">
                        ${numberFormat(lastBalanceAmount)}
                    </Typography>
                   </div>
            </div>
        </Paper>
        );
    }
}

AccountOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountOverview);