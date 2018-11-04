import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Radio from '@material-ui/core/Radio';
import ChargeIcon from '@material-ui/icons/Payment';
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
        backgroundColor: red[500],
    },
    cardheader : {
        fontSize:30,
    },
    inputMargin: {
        margin: theme.spacing.unit,
    },
});

class PanelCharge extends Component {
    render() {
        const { classes,
                panelChargeType, 
                setPanelChargeType, 
                panelChargeValue, 
                setPanelChargeValue,
                panelChargeValueError,
                handlePanelChargeSubmit
        } = this.props;
        return(
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        <ChargeIcon />
                    </Avatar>
                }
                title="New Charge"
                subheader="Add a new charge to the credit card"
                />
            <CardContent>
                <Divider />
                <br />
                <Typography variant="h5" component="h3" color="textSecondary" className={classes.labels}>
                    Select Charge Type
                </Typography>
                <Radio
                    checked={panelChargeType === 'whole-foods'}
                    onChange={setPanelChargeType}
                    value="whole-foods"
                    name="panel_charge_type"
                    aria-label="A"
                    label="Whole Foods"
                />
                Whole Foods
                <Radio
                    checked={panelChargeType === 'shell'}
                    onChange={setPanelChargeType}
                    value="shell"
                    name="panel_charge_type"
                    aria-label="B"
                    label="Shell Gas"
                />
                Shell
                <Radio
                    checked={panelChargeType === 'walmart'}
                    onChange={setPanelChargeType}
                    value="walmart"
                    name="panel_charge_type"
                    aria-label="C"
                    label="Walmart"
                />
                Walmart
                <Radio
                    checked={panelChargeType === 'mapco'}
                    onChange={setPanelChargeType}
                    value="mapco"
                    name="panel_charge_type"
                    aria-label="D"
                    label="Mapco"
                />
                Mapco Gas
                <Radio
                    checked={panelChargeType === 'costco'}
                    onChange={setPanelChargeType}
                    value="costco"
                    name="panel_charge_type"
                    aria-label="E"
                    label="Costco"
                />
                Costco
                <Radio
                    checked={panelChargeType === 'exxon'}
                    onChange={setPanelChargeType}
                    value="exxon"
                    name="panel_charge_type"
                    aria-label="F"
                    label="Exxon"
                />
                Exxon Gas
                <br /><br />
                <Typography variant="h5" component="h3" color="textSecondary" className={classes.labels}>
                    Enter Charge Amount
                </Typography>
                {panelChargeValueError &&
                    <h3 className="panel-error">Enter charge amount between $1.00 - $150.00</h3>
                }
                <br />
                <FormControl  className={classes.inputMargin}>
                    <InputLabel htmlFor="adornment-amount">Dollar Amount</InputLabel>
                    <Input
                        id="adornment-amount"
                        placeholder="Charge Amount, i.e. 9.49"
                        value={panelChargeValue}
                        onChange={setPanelChargeValue}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
                <br />
                <br />
                <Button variant="contained" color="primary" className={classes.button} onClick={handlePanelChargeSubmit}>submit</Button>
            </CardContent>
        </Card>
        );
    }
}


PanelCharge.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(PanelCharge);