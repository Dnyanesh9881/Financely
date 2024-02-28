import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import IncomeModal from "../Modal/incomeModal";
import ExpenseModal from "../Modal/expenseModal";
import { toast } from "react-toastify";
import { addDoc, collection, getDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable";
import Chart from "../components/Chart";
import NoTransactions from "../components/NoTransactions";

function Dashboard() {
  const [isExpenseModelVisible, setIsExpenseModelVisible] = useState(false);
  const [isIncomeModelVisible, setIsIncomeModelVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
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
  let sortedTransactions=transactions.sort((a,b)=>{
    return new Date(a.date)-new Date(b.date);
  })
  const onFinish = (values, type) => {
    // console.log("onFinish Fn:", type, values);
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `user/${user.uid}/transactions`),
        transaction
      );

      console.log("doc written with id: ", docRef.id);
      if(!many)toast.success("Transaction Added");
      let newArray = transactions;
      newArray.push(transaction);
      setTransactions(newArray);
      calculateBalance();
    } catch (e) {
      console.log("Error Adding Document", e);
      if(!many)  toast.error("Couldn't Add Transaction");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `user/${user.uid}/transactions`));
      const querySnapShot = await getDocs(q);
      let transactionArray = [];
      querySnapShot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      setTransactions(transactionArray);
      console.log(transactionArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setExpense(totalExpense);
    setIncome(totalIncome);
    setTotalBalance(totalIncome - totalExpense);
  }
  
  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <ExpenseModal
            isExpenseModelVisible={isExpenseModelVisible}
            handelExpenseCancel={handelExpenseCancel}
            onFinish={onFinish}
          />
          <IncomeModal
            isIncomeModelVisible={isIncomeModelVisible}
            handelIncomeCancel={handelIncomeCancel}
            onFinish={onFinish}
          />
        </>
      )}
      {
        transactions.length!==0 && sortedTransactions.length!==0?<Chart sortedTransactions={sortedTransactions} />: <NoTransactions/>
      }
      <TransactionsTable
        transactions={transactions}
        addTransaction={addTransaction}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
}

export default Dashboard;
