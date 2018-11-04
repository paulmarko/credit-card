import React from 'react';
import PropTypes from 'prop-types';
import TransactionTableRowDetail from './TransactionTableRowDetail';
import TableRow from '@material-ui/core/TableRow';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ChargeIcon from '@material-ui/icons/Payment';
import CreditIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/AddCircle';

function TimeStampToJSDateMDY(dateString) {
  var dateOptions = {  year: '2-digit', month: '2-digit', day: '2-digit'};
  var d = new Date(dateString);
  var dateVal = d.toLocaleDateString("en-US", dateOptions); 
  return dateVal;
}
function numberFormat (num) {
  return num.replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const TransactionTableRow = props => { 
    const rows = props.ccTransactions.map((row, index) => { 
        return (
          <TableRow key={index} className={classNames(props.classes.row, "trans-type-" + row.trans_type)}>
              <CustomTableCell component="th" scope="row">{TimeStampToJSDateMDY(row.transact_at)}</CustomTableCell>
              <CustomTableCell className="text-capitalize">
                  <button value={"row_detail_id_" + row.id} onClick={props.toggleDetailVisibility} className="button-details">
                  <UnfoldMoreIcon />
                  </button>
                  {row.transaction}
                  <TransactionTableRowDetail 
                      row={row}
                      toggleDetailVisibility={props.toggleDetailVisibility}
                      state={props.state}
                  />
              </CustomTableCell>
              <CustomTableCell>
                {row.trans_type === 'payment' && <PaymentIcon style={{width:'30px', color:'#5eff9e'}} />}
                {row.trans_type === 'charge' && <ChargeIcon style={{width:'30px', color:'#fa726e'}} />}
                {row.trans_type === 'credit' && <CreditIcon style={{width:'30px',color:'#5eff9e'}} />}
                {row.trans_type}
              </CustomTableCell>
              <CustomTableCell className="text-right">{numberFormat(row.trans_amount)}</CustomTableCell>
              <CustomTableCell className="text-right">
                  {props.showBalanceColumn ? (
                    numberFormat(row.trans_balance)
                  ):(
                    ""
                  )} 
              </CustomTableCell>
          </TableRow>
          /*
            <tr key={index} className={"trans-type-" + row.trans_type}>
              <td>{TimeStampToJSDateMDY(row.transact_at)}</td>
              <td className="text-capitalize">
                  <button value={"row_detail_id_" + index} onClick={props.toggleDetailVisibility} className="button-details">
                  <i className="fa fa-plus-circle text-primary">&nbsp;</i>
                  </button>
                  {row.transaction}
                  <TransactionTableRowDetail 
                      index={index}
                      row={row}
                      toggleDetailVisibility={props.toggleDetailVisibility}
                      state={props.state}
                  />
              </td>
              <td>{row.trans_type}</td>
              <td className="text-right">{numberFormat(row.trans_amount)}</td>
              <td className="text-right">
              {props.showBalanceColumn ? (
                numberFormat(row.trans_balance)
              ):(
                ""
              )}           
              </td>
            </tr>
         */
      );
    });
    return <TableBody>{rows}</TableBody>;
}

TransactionTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionTableRow);
