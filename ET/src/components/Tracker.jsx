import React, { useState, useEffect } from "react";
import axios from "axios";
import Overview from "./Overview";
import AddTransaction from "./AddTransaction";
import TransactionContainer from "./TransactionContainer";
import UpdateTransaction from "./UpdateTransaction";

const Tracker = () => {
  const [toggle, setToggle] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [transactionToUpdate, setTransactionToUpdate] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balanceSet, setBalanceSet] = useState(false);

  const baseUrl = "http://localhost:8000";

  
  const getAllTransactions = () => {
    axios
      .get(`${baseUrl}/display`)  
      .then((response) => setTransactions(response.data))
      .catch((error) =>
        console.error("Error fetching transactions:", error)
      );
  };

  const addTransaction = (payload) => {
    const updatedTransactions = transactions.concat(payload);
    setTransactions(updatedTransactions);

    if (payload.transType === "balance" && !balanceSet) {
      setBalanceSet(true);
      setBalance(payload.amount); 
    }
    axios
    .post(`${baseUrl}/`, payload)
    .then(() => getAllTransactions())
    .catch((error) => console.error("Error adding transaction:", error));
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction._id === updatedTransaction._id
        ? updatedTransaction
        : transaction
    );
    setTransactions(updatedTransactions);
    setTransactionToUpdate(null);
    axios
    .put(`${baseUrl}/update/${updatedTransaction._id}`,updatedTransaction)
    .then(() => getAllTransactions())
    .catch((error) => console.error("Error updating transaction:", error));
  };

  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction._id !== id
    );
    setTransactions(updatedTransactions);
    axios
    .delete(`${baseUrl}/delete/${id}`)
    .then(()=> getAllTransactions())
    .catch((error) => console.error("Error deleting transaction:", error));
  };

  
  const calculateTransactions = () => {
    let exp = 0;
    let inc = 0;

    transactions.forEach((item) => {
      if (item.transType === "expense") {
        exp += item.amount;
      } else if (item.transType === "income") {
        inc += item.amount;
      }
       else if (item.transType === "balance") {
        setBalance(item.amount); 
      }
    });
    setExpense(exp);
    setIncome(inc);
  };

  
  useEffect(() => {
    getAllTransactions();
  }, []);

  
  useEffect(() => {
    calculateTransactions();
  }, [transactions]);

  return (
    <div className="container">
      <h1 className="heading" style={{ textAlign: "center" }}>
        Expense Tracker
      </h1>
      <Overview
        toggle={toggle}
        setToggle={setToggle}
        income={income}
        expense={expense}
        balance={balance} 
      />
      <div
        className="transaction-details"
        style={{ display: "flex", gap: "10px" }}
      >
        <div
          className="expense-box"
          style={{
            width: "230px",
            padding: "10px 20px",
            outline: "none",
            borderRadius: "5px",
            display: "flex",
            border: "none",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f44336",
            color: "#fff",
            height: "50px",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          <strong>Expense:</strong>{" "}
          <span style={{ marginLeft: "10px" }}>₹{expense}</span>
        </div>
        <div
          className="income-box"
          style={{
            width: "230px",
            padding: "10px 20px",
            outline: "none",
            borderRadius: "5px",
            display: "flex",
            border: "none",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#44E610",
            color: "#fff",
            height: "50px",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          <strong>Income:</strong>{" "}
          <span style={{ marginLeft: "10px" }}>₹{income}</span>
        </div>
      </div>
      {transactionToUpdate ? (
        <UpdateTransaction
          transaction={transactionToUpdate}
          handleUpdateTransaction={handleUpdateTransaction}
        />
      ) : (
        <AddTransaction
          AddTransactions={addTransaction}
          balanceSet={balanceSet}
        />
      )}
      <TransactionContainer
        transactions={transactions}
        removeTransaction={removeTransaction}
        editTransaction={setTransactionToUpdate}
      />
    </div>
  );
};

export default Tracker;