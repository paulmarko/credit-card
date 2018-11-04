import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import PaymentIcon from '@material-ui/icons/AttachMoney';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
      minWidth: 275,
    },
    avatar: {
        backgroundColor: green[500],
    },
    cardheader : {
        fontSize:30,
    },
    inputMargin: {
        margin: theme.spacing.unit,
    },
});

class PanelPayment extends Component {
    render() {
        const { classes,
                panelPaymentValue, 
                setPanelPaymentValue,
                panelPaymentValueError,
                handlePanelPaymentSubmit
        } = this.props;
        return(
            <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        <PaymentIcon />
                    </Avatar>
                }
                title="New Payment"
                subheader="Make a payment on the credit card"
                />
            <CardContent>
                <Divider />
                <br />
 
                <Typography variant="h5" component="h3" color="textSecondary" className={classes.labels}>
                    Enter Payment Amount
                </Typography>
                {panelPaymentValueError &&
                    <h3 className="panel-error">Enter payment amount between $1.00 - $150.00</h3>
                }
                <br />
                <FormControl  className={classes.inputMargin}>
                    <InputLabel htmlFor="adornment-amount">Dollar Amount</InputLabel>
                    <Input
                        id="adornment-amount"
                        placeholder="Charge Amount, i.e. 9.49"
                        value={panelPaymentValue}
                        onChange={setPanelPaymentValue}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
                <br />
                <br />
                <Button variant="contained" color="primary" className={classes.button} onClick={handlePanelPaymentSubmit}>submit</Button>
            </CardContent>
        </Card>
        );
    }
}


PanelPayment.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(PanelPayment);