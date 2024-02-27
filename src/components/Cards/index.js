import { Card, Row } from 'antd'
import React from 'react'
import Button from '../Button'
import "./style.css";

function Cards({showExpenseModal, showIncomeModal}) {
  return (
    <div>
        <Row className='cards-row'>
            <Card bordered={true} className='my-card'>
                <h2>Current Balance</h2>
                <hr/>
                <p>₹0</p>
                <Button blue={true} text="Reset Balance" />
            </Card>
            <Card bordered={true} className='my-card'>
                <h2>Total Income</h2>
                <hr/>
                <p>₹0</p>
                <Button blue={true} text="Add Income"  onClick={showIncomeModal}/>
            </Card>
            <Card bordered={true} className='my-card'>
                <h2>Total Expense</h2>
                <hr/>
                <p>₹0</p>
                <Button blue={true} text="Add Expense" onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards