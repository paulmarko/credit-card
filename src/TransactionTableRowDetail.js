import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChargeIcon from '@material-ui/icons/Payment';
import CreditIcon from '@material-ui/icons/AttachMoney';
import PaymentIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';


function TimeStampToDateString(dateString) {
  var dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour : '2-digit', minute: '2-digit'};
  var d = new Date(dateString);
  var dateVal = d.toLocaleDateString("en-US", dateOptions); 
  return dateVal;
}

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    color:'#333',
  },
  date: {
    fontSize:15,
    color:'#007bff',
    margin:'10px 0 10px 0',
  },
  labels : {
    color:'#333',
    fontWeight:'bold',
  },
  pos: {
    marginBottom: 12,
  },
  muted: {
    color:'#6c757d',
  },
  icons:{
    padding:'0px',
    marginRight:'4px',
  }
};

class TransactionTableRowDetail extends Component {
    render() {
      const { classes } = this.props;
      const { state, row } = this.props;
      return(
      <div className={(state['row_detail_id_' + row.id] ? '' : 'hide-element')} >
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" className={classes.title} color="textSecondary">
            {row.trans_type === 'payment' && <PaymentIcon className={classes.icons} style={{color:'#5eff9e'}} />}
            {row.trans_type === 'charge' && <ChargeIcon className={classes.icons} style={{color:'#fa726e'}}/>}
            {row.trans_type === 'credit' && <CreditIcon className={classes.icons}  style={{color:'#5eff9e'}} />}
            {row.merchant_name}
            </Typography>
            <Divider />
            <Typography variant="body1"  className={classes.date}>
              {TimeStampToDateString(row.transact_at)}
            </Typography>
            <Typography variant="body1" color="textSecondary" className={classes.labels}>
              Code: <span className={classes.muted}>{row.merchant_code}</span>
            </Typography>
            <Typography variant="body1" color="textSecondary" className={classes.labels}>
              Category: <span className={classes.muted}>{row.merchant_category}</span>
            </Typography>
            <Typography variant="body1" color="textSecondary" className={classes.labels}>
              Transaction ID: <span className={classes.muted}>{row.merchant_transaction_id}</span>
            </Typography>

          </CardContent>
        </Card>
      </div>
      )
    }
  }

TransactionTableRowDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionTableRowDetail);