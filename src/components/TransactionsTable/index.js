import { Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import "./style.css";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

function TransactionsTable({ transactions, addTransaction, fetchTransactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let fileredTransactions = transactions.filter(
    (element) =>
      element.name.toLowerCase().includes(search.toLowerCase()) &&
      element.type.includes(typeFilter)
  );
  const sortedTransactions = fileredTransactions.sort((a, b) => {
    if (sortKey === "amount") {
      return a.amount - b.amount;
    } else if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return 0;
    }
  });
  function importCSV(event){
     event.preventDefault();
     try{
        parse(event.target.files[0], {
            header: true,
            complete: async function (results){

                console.log(results);
                for(const transaction of results.data){
                    console.log("Transactions", transaction);
                    const newTransaction={
                        ...transaction,
                        amount:parseInt(transaction.amount),

                    };
                    await addTransaction(newTransaction, true);
                }
            }
        });
        toast.success("All Transactions Added");
        fetchTransactions();
        event.target.files=null;
     }catch(e){
        toast.error(e.message);
     }
  }
  function exportCSV(){
      var csv=unparse({
        fields:["name", "type", "tag", "date", "amount"],
        data: transactions
      });
      const blob=new Blob([csv], {type:"text/csv;charset-utf-8;"});
      const url=URL.createObjectURL(blob);
      const link=document.createElement("a");
      link.href=url;
      link.download="transactions.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  return (
    <div className="table-sort-csv-search">
      <div className="input-and-select">
        <div className="input-named-transactions">
          {" "}
          🔍{" "}
          <input
            className="named-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search name here"
          />
        </div>

        <Select
          className="select-input"
          value={typeFilter}
          onChange={(value) => setTypeFilter(value)}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="Income">Income</Option>
          <Option value="Expense">Expense</Option>
        </Select>
      </div>
      <div className="sort-and-csv">
        <h1>My Transactions</h1>
        <Radio.Group
          className="radio-input"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="all-csv">
          <button className="btn" onClick={exportCSV}>Export to CSV</button>
          <label for="file-csv" className="btn btn-blue" style={{fontSize:"16px"}}>
            Import from CSV
          </label>
          <input
            id="file-csv"
            accept=".csv"
            required
            type="file"
            onChange={importCSV}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table
        className="table"
        dataSource={sortedTransactions}
        columns={columns}
      />
    </div>
  );
}

export default TransactionsTable;
