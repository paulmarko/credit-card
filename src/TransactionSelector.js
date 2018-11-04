import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TransactionMessage from './TransactionMessage';



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

//class TransactionSelector extends React.Component {
//  render(){
const TransactionSelector = (props) => {
        const { classes, searchInputVal, curMonth, curYear, nextMonth,
                handleCurrentMonth,
                handlePreviousMonth,
                handleNextMonth } = props;
        return (
          <div style={{paddingTop:0}}>
            <TransactionMessage 
                searchInputVal={searchInputVal}
                curMonth={curMonth}
                curYear={curYear}
            />
            <Button variant="outlined" onClick={handleCurrentMonth} color="primary" className={classes.button}>
              Current Month
            </Button>
            <Button variant="outlined" onClick={handlePreviousMonth} color="primary" className={classes.button}>
              &lt; prev
            </Button>
            {(nextMonth !== '') ? (
            <Button variant="outlined" onClick={handleNextMonth} color="primary" className={classes.button}>
              next &gt;
            </Button>
            ) : (
            <Button variant="outlined" disabled className={classes.button}>
              next &gt;
            </Button>
            )}
          </div>
        );
    }

    TransactionSelector.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    
    export default withStyles(styles)(TransactionSelector);