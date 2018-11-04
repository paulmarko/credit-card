import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import './App.css';
import NavTabs from './NavTabs';
import NavMain from './NavMain';
import SnackbarMessage from './SnackbarMessage';
import TransactionProgress from './TransactionProgress';
import AccountOverview from './AccountOverview';

/*
function logMe(msg) {
  console.log(msg);
}
function logMeStop(msg) {  
  console.log(msg);
  throw "stop execution";
}
*/

function createTransactionSelectorDates (month,year,currentMonth){
  let nMonth, nYear, pMonth, pYear;
  // next - only set if future exsists and not showing current month
  if (month !== currentMonth) { 
    if (month === 11) {
      nMonth = 1;
      nYear = year + 1;
    } else {
      nMonth = month + 1;
      nYear = year;
    }
  } else {
     nMonth = '';
     nYear = ''; 
  }
  // previous
  if (month === 0) {
    pMonth = 11;
    pYear = year - 1;
  } else {
    pMonth = month - 1;
    pYear = year;
  }

  let dates = {
    current_month : month,
    current_year : year,
    next_month : nMonth,
    next_year : nYear,
    previous_month : pMonth,
    previous_year : pYear,
  }
  return dates;
}


class FilterableTransactions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      myjson: [],
      input: '',
      search_on_value: 'all',
      transactions_found : true,
      current_month : '',
      current_year : '',
      next_month : '',
      next_year : '',
      previous_month : '',
      previous_year : '',
      show_balance_column : true,
      sort_current_value : 'up',
      error : null,
      panel_charge_type : 'whole-foods',
      panel_charge_value: '',
      panel_charge_value_error: false,
      panel_payment_value: '',
      panel_payment_value_error: false,
      snackbar_message : '',
      snackbar_message_state : false,
      panel_chart_data: [],
      progress_bar_state: false,
      last_payment_ts: '',
      last_payment_amount: '',
      last_balance_amount: '',
      pusher_alerts_json: [],
      chart_json: [],
    };

    // PUSHER - External WebSocket Service
    const pusher = new Pusher('41219567f6c45c660703', {
      cluster: 'us2',
      forceTLS: true
    });
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      //.log(data);
      this.setState({ 
        //pusher_message : JSON.stringify(data)
        pusher_alerts_json : [data, ...this.state.pusher_alerts_json],
      });
    });

    // VARS
    let date = new Date();
    let nowM = date.getMonth();
    let nowY = date.getFullYear();
    let nowObj = createTransactionSelectorDates (nowM, nowY, nowM);
    this.state.initialState = nowObj;

    this.handleChange = this.handleChange.bind(this);
    this.setSearchOn = this.setSearchOn.bind(this);
    this.handleCurrentMonth = this.handleCurrentMonth.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
    this.sortUp = this.sortUp.bind(this);
    this.sortDown = this.sortDown.bind(this);
    this.setPanelChargeType = this.setPanelChargeType.bind(this);
    this.setPanelChargeValue = this.setPanelChargeValue.bind(this);
    this.handlePanelChargeSubmit = this.handlePanelChargeSubmit.bind(this);
    this.setPanelPaymentValue = this.setPanelPaymentValue.bind(this);
    this.handlePanelPaymentSubmit = this.handlePanelPaymentSubmit.bind(this);
    this.clearAlerts = this.clearAlerts.bind(this);
  }
  handleChange(event) {
    let searchVal = event.target.value,
        searchOn = this.state.search_on_value,
        balanceColumn = true;
    
    if (searchVal.trim() !== '') {
      balanceColumn = false;
    }

    this.setState({
      input: searchVal,
      show_balance_column : balanceColumn,
    });
    this.findTransaction(searchVal, searchOn);
  }
  setSearchOn(event) {
    this.setState({
      search_on_value: event.target.value,
    });
    this.findTransaction(this.state.input, event.target.value);
  }
  resetSearchEls() {
    this.setState({
      input: ''
    });
  }
  handleCurrentMonth(event) {
    event.preventDefault();
    this.resetSearchEls();
    // current
    let adjustM;
    let date = new Date();
    let nowM = date.getMonth();
    let nowY = date.getFullYear();

    let obj = createTransactionSelectorDates(nowM,nowY,nowM);
    this.setState(obj);
    adjustM = nowM + 1; // adjust month to use 1-12 vs. 0-11
    
    this.fetchMonthlyTransactions(adjustM, nowY); 
  }
  handleNextMonth(event) {
    event.preventDefault();
    this.resetSearchEls();
    let adjustM;
    let date = new Date();
    let nowM = date.getMonth();
    let nextM = this.state.next_month;
    let nextY =  this.state.next_year;

    let obj = createTransactionSelectorDates(nextM,nextY,nowM);
    this.setState(obj);
    adjustM = nextM + 1; // adjust month to use 1-12  vs. 0-11

    this.fetchMonthlyTransactions(adjustM, nextY);
  }
  handlePreviousMonth(event){
    event.preventDefault();
    this.resetSearchEls();
    let adjustM;
    let date = new Date();
    let nowM = date.getMonth();
    let prevM = this.state.previous_month;
    let prevY =  this.state.previous_year;

    let obj = createTransactionSelectorDates(prevM,prevY,nowM);
    this.setState(obj);
    adjustM = prevM + 1; // adjust month to use 1-12 vs 0-11

    this.fetchMonthlyTransactions(adjustM,prevY);
  }
  sortUp() {
    let newJson = this.state.myjson;
    function compare(a,b) {
      if (a.transact_at > b.transact_at)
        return -1;
      if (a.transact_at < b.transact_at)
        return 1;
      return 0;
    }
    
    newJson.sort(compare);
    //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 
    this.setState ({
      show_balance_column : true,
      sort_current_value : 'up',
      myjson : newJson
    });
  }
  sortDown() {
      let newJson = this.state.myjson;
      function compare(a,b) {
        if (a.transact_at < b.transact_at)
          return -1;
        if (a.transact_at > b.transact_at)
          return 1;
        return 0;
      }
      
      newJson.sort(compare);
      //objs.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0)); 
      this.setState ({
        show_balance_column : false,
        sort_current_value : 'down',
        myjson : newJson
      });
  }
  setPanelChargeType(event) {
    this.setState({
      panel_charge_type : event.target.value
    });
  }
  setPanelChargeValue(event){ 
    this.setState({
      panel_charge_value : event.target.value
    });
  }
  handlePanelChargeSubmit(event){
    event.preventDefault();
    let regex  = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
    let numVal = this.state.panel_charge_value;
    let numErr = true;
    if (regex.test(numVal) && parseFloat(numVal) < 151 && parseFloat(numVal) > 0) {
      numErr = false;
      this.addCharge(this.state.panel_charge_type, this.state.panel_charge_value);
    } 
    this.setState({
      panel_charge_value_error : numErr
    });
    
  }
  setPanelPaymentValue(event){ 
    this.setState({
      panel_payment_value : event.target.value
    });
  }
  handlePanelPaymentSubmit(event){
    event.preventDefault();
    let regex  = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
    let numVal = this.state.panel_payment_value;
    let numErr = true;
    if (regex.test(numVal) && parseFloat(numVal) < 151 && parseFloat(numVal) > 0) {
      numErr = false;
      this.addPayment(this.state.panel_payment_value);
    } 
    this.setState({
      panel_payment_value_error : numErr
    });
    
  }
  fetchMonthlyTransactions(month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
    this.setState({
      progress_bar_state: true,
    });
    
    // process.env.REACT_APP_FETCHMONTHLY_TRANS
    const url = process.env.REACT_APP_FETCHMONTHLY_TRANS + year + "/" + month;

    if(0) {
      fetch(url)
          .then(result => result.json())
          .then(result => { 
              if (result.data.length < 1) {
                this.setState({
                  transactions_found : false
                });
              } else {
                this.setState({
                  transactions_found : true
                });
              }
              this.setState({
                  myjson: result.data
              })
          })
          .catch(error => this.setState({ error }));
    } else {

      // AXIOS
      let self = this;
      axios.get(url)
        //.then(result => result.json())
        .then(function (response) {
          //let responseOK = response && response.status === 200 && response.statusText === 'OK';
          // handle success
          if (response.data.data.length < 1) {
            self.setState({
              transactions_found : false,
            });
          } else {
            self.setState({
              transactions_found : true,
            });
          }
          self.setState({
              myjson: response.data.data,
              progress_bar_state: false,
          })
        })
        .catch(error => self.setState({ error }));
    }
    


  }
  findTransaction = (searchVal,searchOn) => {
      var searchValTrimmed = searchVal.trim(); 
      if (searchValTrimmed !== '' && searchValTrimmed !== undefined) {
        // process.env.REACT_APP_FIND_TRANS
        const url = process.env.REACT_APP_FIND_TRANS + searchOn + "/" + searchValTrimmed;
        this.setState({
          progress_bar_state: true,
        });
        fetch(url)
            .then(result => result.json())
            .then(result => { 
                if (result.data.length < 1) {
                  this.setState({
                    transactions_found : false
                  });
                } else {
                  this.setState({
                    transactions_found : true
                  });
                }
                this.setState({
                    myjson: result.data,
                    progress_bar_state: false,
                })
            })
            .catch(error => this.setState({ error }));
      }
  }
  getLastData = () => {
    // process.env.REACT_APP_GETLAST_DATA
    const url = process.env.REACT_APP_GETLAST_DATA;
    fetch(url)
        .then(result => result.json())
        .then(result => { 
            if (result.data.length < 1) {
              this.setState({
                last_payment_ts: '',
                last_payment_amount: '',
                last_balance_amount: '',
              });
            } else {
              this.setState({
                last_payment_ts: result.data.last_pay_time_stamp,
                last_payment_amount: result.data.last_pay_amount,
                last_balance_amount: result.data.last_balance,
              });
            }
        })
        .catch(error => this.setState({ error })); 
  }
  getChartData = () => {
    // process.env.REACT_APP_GETCHARTS
    const url = process.env.REACT_APP_GETCHARTS;
    fetch(url)
        .then(result => result.json())
        .then(result => { 
            if (result.data.length < 1) {
              this.setState({
                chart_json: [],
              });
            } else {
              this.setState({
                chart_json: result.data,
              });
            }
        })
        .catch(error => this.setState({ error }));
  }
  addCharge(charge_type, charge_value) {
    this.setState({
      progress_bar_state: true,
    });

    let data = {charge_type:charge_type, charge_value:charge_value}
    // process.env.REACT_APP_ADDCHARGE
    const url = process.env.REACT_APP_ADDCHARGE;

    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json; charset=utf-8" 
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
        .then(result => result.json())
        .then(result => { 
            
            if (result.data.length < 1) {
              this.setState({
                snackbar_message : 'Charge Not Added!',
                snackbar_message_state : true,
              });
            // result.data = 'success'
            } else {
              if (result.data[0] === 'success') {
                this.setState({
                  snackbar_message : 'Charge Added!',
                  snackbar_message_state : true,
                  panel_charge_value: '',
                });

                this.fetchMonthlyTransactions();
                this.getLastData();
                this.getChartData();
              } else {
                this.setState({
                  snackbar_message : 'Charge Not Added!',
                  snackbar_message_state : true,
                });
              }
            }
            setTimeout( () => {
              this.setState({
                snackbar_message : '',
                snackbar_message_state : false,
                panel_charge_value: '',
                
              });
            }, 3000);
        });
        //.catch(error => this.setState({ error }));
  }
  addPayment(payment_value) {
    this.setState({
      progress_bar_state: true,
    });

    let data = {payment_value:payment_value}
    // process.env.REACT_APP_ADDPAYMENT
    const url = process.env.REACT_APP_ADDPAYMENT;

    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json; charset=utf-8" 
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
        .then(result => result.json())
        .then(result => { 
            if (result.data.length < 1) {
              this.setState({
                snackbar_message : 'Payment Not Added!',
                snackbar_message_state : true,
              });
            // result.data = 'success'
            } else {
              if (result.data[0] === 'success') {
                this.setState({
                  snackbar_message : 'Payment Added!',
                  snackbar_message_state : true,
                  panel_payment_value: '',
                });

                this.fetchMonthlyTransactions();
                this.getLastData();
                this.getChartData();
              } else {
                this.setState({
                  snackbar_message : 'Payment Not Added!',
                  snackbar_message_state : true,
                });
              }
            }
            setTimeout( () => {
              this.setState({
                snackbar_message : '',
                snackbar_message_state : false,
                panel_payment_value: '',
              });
            }, 3000); 
        });
        //.catch(error => this.setState({ error }));
  }
  clearAlerts() {
    this.setState({
      pusher_alerts_json: []
    }); 
  }
  componentDidMount() {
      // FIRST TIME LOAD
      // month 0 to 11
      //let month = new Date().getMonth() + 1;
      // day of the month 1 to 31
      //let day = currentTime.getDate()
      // year (four digits)
      //let year = new Date().getFullYear();
      //let timeZoneOffset = -(currentTime.getTimezoneOffset());
      this.fetchMonthlyTransactions(); 
      // current
      let date = new Date();
      let nowM = date.getMonth();
      let nowY = date.getFullYear();

      let obj = createTransactionSelectorDates(nowM,nowY,nowM);

      this.setState(obj);

      this.getLastData();
      this.getChartData();
  }
  render() {
    const  myjson = this.state.myjson; 
    
    return(
      <div>
        <NavMain 
          clearAlerts={this.clearAlerts}
          pusherMessageJson={this.state.pusher_alerts_json}
        />
        
        <AccountOverview 
          lastBalanceAmount={this.state.last_balance_amount}
          lastPaymentTS={this.state.last_payment_ts}
          lastPaymentAmount={this.state.last_payment_amount}  
        />
        <TransactionProgress progressBarState={this.state.progress_bar_state} />
        

        <NavTabs
            /* PanelChart */
            panelChartData={this.state.chart_json}
            /* SearchTransactions */
            searchVal={this.state.input} 
            onChangeSearch={this.handleChange}
            setSearchOn={this.setSearchOn}
            searchOn = {this.state.search_on_value}
            /* TransactionsSelector */
            searchInputVal={this.state.input}
            curMonth={this.state.current_month}
            curYear={this.state.current_year}
            nextMonth={this.state.next_month}
            handleCurrentMonth={this.handleCurrentMonth}
            handleNextMonth={this.handleNextMonth}
            handlePreviousMonth={this.handlePreviousMonth}
            /* TransactionTable */
            transactionsFound={this.state.transactions_found}
            ccTransactions={myjson}
            error={this.state.error}
            sortUp={this.sortUp}
            sortDown={this.sortDown}
            sortCurrentValue={this.state.sort_current_value}
            showBalanceColumn={this.state.show_balance_column}
            /* PanelPayment */
            showPanelPayment={true}
            panelPaymentValue={this.state.panel_payment_value}
            panelPaymentValueError={this.state.panel_payment_value_error}
            setPanelPaymentValue={this.setPanelPaymentValue}
            handlePanelPaymentSubmit={this.handlePanelPaymentSubmit}
            /* PanelCharge */
            showPanelCharge={true}
            panelChargeType={this.state.panel_charge_type}
            setPanelChargeType={this.setPanelChargeType}
            panelChargeValue={this.state.panel_charge_value}
            panelChargeValueError={this.state.panel_charge_value_error}
            setPanelChargeValue={this.setPanelChargeValue}
            handlePanelChargeSubmit={this.handlePanelChargeSubmit}
        >
        </NavTabs>
        <SnackbarMessage
            snackbarMessage={this.state.snackbar_message}
            snackbarMessageState={this.state.snackbar_message_state}
        />
      </div>
    );
  }
}



export default FilterableTransactions;
