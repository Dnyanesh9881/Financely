import React from 'react';
import { Line, Pie } from '@ant-design/charts';
import "./style.css";


function Chart({sortedTransactions}) {
  console.log("Sssss:", sortedTransactions);
     
    const data=sortedTransactions?.map((item)=>{
        return {date:item.date, amount:item.amount};
    });
    const spendingData = sortedTransactions.filter((item)=>{
      if(item.type ==="Expense"){
        return {tag: item.tag, amount:item.amount};
      }
  })
  let finalSpendings= Object.values(spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {}));
    const config = {
        data,
        xField: 'date',
        yField: 'amount',
      };
     
      const spendingConfig = {
        appendPadding: 10,
      data:finalSpendings,
        angleField: 'amount',
        colorField: 'tag',
        radius: 0.9,
        // label: {
        //   type: 'inner',
        //   offset: '-30%',
        //   content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        //   style: {
        //     fontSize: 14,
        //     textAlign: 'center',
        //   },
        // },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };
  return (
    <div className='chart-wrapper'>
        <div className='line-chart'>
            <h2>Your Analytics</h2>
        <Line  {...config}/>
        </div>
        <div className='pie-chart'>
            <h2>Your spending</h2>
            <Pie {...spendingConfig} />
        </div>
    </div>
  )
}

export default Chart