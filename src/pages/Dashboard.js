import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import IncomeModal from "../Modal/incomeModal";
import ExpenseModal from "../Modal/expenseModal";

function Dashboard() {
  const [isExpenseModelVisible, setIsExpenseModelVisible] = useState(false);
  const [isIncomeModelVisible, setIsIncomeModelVisible] = useState(false);

  const showIncomeModal = () => {
    setIsIncomeModelVisible(true);
  };
  const showExpenseModal = () => {
    setIsExpenseModelVisible(true);
  };
  const handelExpenseCancel = () => {
    setIsExpenseModelVisible(false);
  };
  const handelIncomeCancel = () => {
    setIsIncomeModelVisible(false);
  };
  const onFinish=(value, type)=>{
      console.log("onFinish Fn:", type, value);
  }
  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <ExpenseModal isExpenseModelVisible={isExpenseModelVisible} handelExpenseCancel={handelExpenseCancel}
      onFinish={onFinish} />
      <IncomeModal isIncomeModelVisible={isIncomeModelVisible} handelIncomeCancel={handelIncomeCancel}
      onFinish={onFinish} />
      
    </div>
  );
}

export default Dashboard;
