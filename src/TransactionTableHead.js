import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
//import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
//import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const TransactionTableHead = (props) => {
    return (
      <TableHead>
      <TableRow>
          <CustomTableCell>
            {props.sortCurrentValue === 'down' ? (
              <span onClick={props.sortUp} style={{cursor:'pointer'}}>
              <ArrowUpward  style={{padding:'2px'}} />
              Posting Date
              </span>
            ) : (
              <span onClick={props.sortDown} style={{cursor:'pointer'}}>
              <ArrowDownward  style={{padding:'2px'}} />
              Posting Date
              </span>
            )}
                    
          </CustomTableCell>
          <CustomTableCell>Description</CustomTableCell>
          <CustomTableCell>Type</CustomTableCell>
          <CustomTableCell numeric>Amount</CustomTableCell>
          <CustomTableCell numeric>
            {props.showBalanceColumn ? (
              "Available Balance"
            ):(
              ""
            )}
          </CustomTableCell>
      </TableRow>
      </TableHead>
    );
  }

export default TransactionTableHead;