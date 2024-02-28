import React from 'react';
import { Line } from '@ant-design/charts';
import "./style.css";

function Chart({sortedTransactions}) {

    const data=sortedTransactions.map((item)=>{
        return {date:item.date, amount:item.amount};
    });
    const config = {
        data,
        xField: 'date',
        yField: 'amount',
      };
  return (
    <div className='chart-wrapper'>
        <div className='line-chart'>
            <h2>Your Analytics</h2>
        <Line  {...config}/>
        </div>
        <div className='pie-chart'>
            <h2>Your spending</h2>
        </div>
    </div>
  )
}

export default Chart