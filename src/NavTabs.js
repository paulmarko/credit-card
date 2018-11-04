import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PanelPayment from './PanelPayment';
import PanelCharge from './PanelCharge';
import TransactionSelector from './TransactionSelector';
import TransactionSearch from './TransactionSearch';
import TransactionTable from './TransactionTable';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import PanelChart from './PanelChart';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding:'15px',
  },
  rootAction: {
    minWidth: 275,
    maxWidth: '100%', 
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    /*flex-flow: shorthand for flex-direction, flex-wrap */
    justifyContent: 'space-evenly',
    alignItems:'flex-start',
    alignContent:'flex-start',
  },
  actionSelect: {
    width:'40%',
    order: '1',
    flexGrow: '1',
    border: '5px solid green',
    alignSelf: 'flex-start'
  },
  actionSearch: {
    width:'40%',
    order: '2',
    flexGrow: '1',
    float: 'right',
    border:'1px solid blue',
  },
});

class NavTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes} = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs value={value} onChange={this.handleChange}>
              <LinkTab label="Transactions" href="transactions" />
              <LinkTab label="History" href="history" />
              <LinkTab label="Make Payment" href="payment" />
              <LinkTab label="Add Charge" href="charge" />
            </Tabs>
          </AppBar>
          {value === 0 && 
            <TabContainer>
              <Slide direction="left" timeout={400} in={true} >
                <Paper className={classes.paper}>
                  
                  {/* below */}
                  <div className={classes.rootAction}>
                    <div className="actionSelect">
                      <TransactionSelector
                        searchInputVal={this.props.searchInputVal}
                        nextMonth={this.props.nextMonth}
                        curMonth={this.props.curMonth}
                        curYear={this.props.curYear}
                        handleCurrentMonth={this.props.handleCurrentMonth}
                        handleNextMonth={this.props.handleNextMonth}
                        handlePreviousMonth={this.props.handlePreviousMonth}
                      />
                    </div>
                    <div className="actionSearch">
                      <TransactionSearch 
                        searchVal={this.props.searchVal} 
                        onChangeSearch={this.props.onChangeSearch}
                        setSearchOn={this.props.setSearchOn}
                        searchOn = {this.props.searchOn}
                      />
                    </div>
                  </div>
                  {/* above */}
                  <TransactionTable 
                    transactionsFound={this.props.transactionsFound}
                    ccTransactions={this.props.ccTransactions}
                    error={this.props.error}
                    sortCurrentValue={this.props.sortCurrentValue}
                    showBalanceColumn={this.props.showBalanceColumn}
                    sortUp={this.props.sortUp}
                    sortDown={this.props.sortDown}
                  />
                </Paper>
              </Slide>
            </TabContainer>}
          {value === 1 && 
          <TabContainer>
            <Slide direction="left" timeout={400} in={true} >
                <Paper className={classes.paper}>
                  <PanelChart
                    panelChartData={this.props.panelChartData}
                  />
                </Paper>
            </Slide>
          </TabContainer>
          }
          {value === 2 && 
          <TabContainer>
            <Slide direction="left" timeout={400} in={true} mountOnEnter unmountOnExit>
            <Paper className={classes.paper}>
            <PanelPayment
                showPanelPayment={this.props.showPanelPayment}
                panelPaymentValue={this.props.panelPaymentValue}
                panelPaymentValueError={this.props.panelPaymentValueError}
                setPanelPaymentValue={this.props.setPanelPaymentValue}
                handlePanelPaymentSubmit={this.props.handlePanelPaymentSubmit}
            />
            </Paper>
            </Slide>
          </TabContainer>}
          {value === 3 && 
          <TabContainer>
            <Slide direction="left" timeout={400} in={true} mountOnEnter unmountOnExit>
            <Paper className={classes.paper}>
            <PanelCharge
                showPanelCharge={this.props.showPanelCharge}
                panelChargeType={this.props.panelChargeType}
                setPanelChargeType={this.props.setPanelChargeType}
                panelChargeValue={this.props.panelChargeValue}
                panelChargeValueError={this.props.panelChargeValueError}
                setPanelChargeValue={this.props.setPanelChargeValue}
                handlePanelChargeSubmit={this.props.handlePanelChargeSubmit}
            />
            </Paper>
            </Slide>
          </TabContainer>}
        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);