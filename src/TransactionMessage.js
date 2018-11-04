import React, { Component } from 'react';

class TransactionMessage extends Component {
    getPageMessage(searchInputVal,curMonth,curYear){
      if (searchInputVal.trim() !== '') {
        return "Search Results ...";
      } else {
        let m = curMonth;
        let y = curYear;
        let d = new Date(y, m, 1, 0, 0, 0, 0);
        let locale = "en-us",
        month = d.toLocaleString(locale, { month: "long" });
        return month + ' ' + y;
      }
    }
    render() {
      const { searchInputVal, curMonth, curYear } = this.props;
      return(
        <div style={{textAlign:'center'}}>
          <h2>{this.getPageMessage(searchInputVal,curMonth,curYear)}</h2>
        </div>
      );
    }
  }
  
export default TransactionMessage;