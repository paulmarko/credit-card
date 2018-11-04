import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TransactionTableRow from './TransactionTableRow';
import TableRow from '@material-ui/core/TableRow';
import TransactionTableHead from './TransactionTableHead';




const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


class TransactionTable extends Component {
    constructor(props){
      super(props);
      this.state = {};
      this.toggleDetailVisibility = this.toggleDetailVisibility.bind(this);
    }
    toggleDetailVisibility (event) {
      let idx = event.currentTarget.value;
      if (this.state[idx] === undefined || this.state[idx] === false) { 
          this.setState({
            [idx]: true
          });
      } else { 
        this.setState({
            [idx]: false
          });
      }
    }

    render() {
        const { classes, transactionsFound,ccTransactions,error,showBalanceColumn, sortUp, sortDown, sortCurrentValue } = this.props;
        let rowMessage;
        if (error) {
            rowMessage = (
                <h4 className="text-center" style={{color: 'red'}}>
                    Whoops, there was a connection error.<br /> We're looking into it right now!
                </h4>
            )
        } else{
            rowMessage = (
                <h4 className="text-center">
                No Transactions Found!
                </h4>
            )
        }

        return (
            <Paper className={classes.root}>
            <Table className={classes.table}>
                <TransactionTableHead
                    sortCurrentValue={sortCurrentValue}
                    showBalanceColumn={showBalanceColumn}
                    sortUp={sortUp}
                    sortDown={sortDown}
                />
                
                {!error && transactionsFound ? (
                <TransactionTableRow
                    ccTransactions={ccTransactions} 
                    toggleDetailVisibility={this.toggleDetailVisibility}
                    state={this.state}
                    showBalanceColumn={showBalanceColumn}
                />
                ) : (
                <tbody>
                    <TableRow>
                        <td colSpan="5" style={{textAlign:'center'}}>
                            {rowMessage}
                        </td>
                    </TableRow> 
                </tbody>
                )}
            </Table>
            </Paper>
        );
    }
}

TransactionTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionTable);