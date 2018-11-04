import React, { Component } from 'react';
import {  Bar, ComposedChart, 
    ResponsiveContainer, CartesianGrid, XAxis, YAxis, 
    Tooltip, Legend, Area } from 'recharts';



class PanelChart extends Component {
    render() {
        const { panelChartData } = this.props;
        return(  
        <div>
            <div style={{textAlign:'center'}}>
                <h3>Charge &amp; Payment History</h3>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart width={730} height={250} data={panelChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>  
                    <linearGradient id="balance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="transdate" />
                <YAxis dataKey="balance" />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area name="balance" type="monotone" dataKey="balance" stroke="#8884d8" fillOpacity={1} fill="url(#balance)" />
                <Bar dataKey="payments" barSize={20} fill="#9cdb95" />
                <Bar dataKey="charges" barSize={20} fill="#ffd06b" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
        );
    }
}
  
export default PanelChart;