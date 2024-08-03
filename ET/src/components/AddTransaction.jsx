import React, { useState, useEffect } from "react";

const AddTransaction = ({AddTransactions, balance, balanceSet}) => {
  const [amount, setAmount] = useState("");
  const [event, setEvent] = useState("");
  const [transType, setTransType] = useState(balanceSet ? "expense" : "balance");
  const [error, setError] = useState("");

  const AddTransactionData = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!balanceSet && transType !== "balance") {
      setError("Please set the initial balance first.");
      return;
    }

    if (transType === "expense" && Number(amount) > balance) {
      setError("Expense amount exceeds the current balance.");
      return;
    }

    if (transType !== "balance" && !event) {
      setError("Event is required.");
      return;
    }

    const newTransaction = {
      amount: Number(amount),
      event: transType === "balance" ? "Balance" : event,
      transType,
    };

    AddTransactions(newTransaction);
    setAmount("");
    setEvent("");
    setTransType("expense");
    setError("");
  };

  useEffect(() => {
    console.log("Balance set status:", balanceSet);
    if (balanceSet) {
      setTransType("expense");
    }
  }, [balanceSet]);

    return (
        
        <div style={{
            textAlign: 'center',
            border: '1px solid #000',
            padding: '20px',
            borderRadius: '5px',
            marginBottom: '25px',
            marginTop: '25px'
        }}>
            {error && (
                <div style={{
                    color: 'red',
                    marginBottom: '10px'
                }}>
                    {error}
                </div>
            )}
            <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{
                    width: '200px',
                    padding: '15px 20px',
                    outline: 'none',
                    borderRadius: '5px',
                    margin: '5px 0',
                    border: '1px solid #000',
                    marginRight: '3px',
                    marginLeft: '3px',
                    marginTop: '3px',
                    marginBottom: '3px'
                }}
            />

            {balanceSet && ( 
                <input
                    type="text"
                    placeholder="Enter Event"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    style={{
                        width: '200px',
                        padding: '15px 20px',
                        outline: 'none',
                        borderRadius: '5px',
                        margin: '5px 0',
                        border: '1px solid #000',
                        marginRight: '3px',
                        marginLeft: '3px',
                        marginTop: '3px',
                        marginBottom: '3px'
                    }}
                />
            )}

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {!balanceSet ? (
                    <div style={{ margin: '10px 20px 10px 0' }}>
                        <input
                            type="radio"
                            id="balance"
                            name="type"
                            value="balance"
                            checked={transType === "balance"}
                            onChange={(e) => setTransType(e.target.value)}
                            style={{
                                marginRight: '10px'
                            }}
                            disabled={balanceSet}
                        />
                        <label htmlFor="balance" style={{ cursor: 'pointer' }}>Balance</label>
                    </div>
                ) : (
                    <>
                        <div style={{ margin: '10px 20px 10px 0' }}>
                            <input
                                type="radio"
                                id="expense"
                                name="type"
                                value="expense"
                                checked={transType === "expense"}
                                onChange={(e) => setTransType(e.target.value)}
                                style={{
                                    marginRight: '10px'
                                }}
                            />
                            <label htmlFor="expense" style={{ cursor: 'pointer' }}>Expense</label>
                        </div>

                        <div style={{ margin: '10px 20px 10px 0' }}>
                            <input
                                type="radio"
                                id="income"
                                name="type"
                                value="income"
                                checked={transType === "income"}
                                onChange={(e) => setTransType(e.target.value)}
                                style={{
                                    marginRight: '10px'
                                }}
                            />
                            <label htmlFor="income" style={{ cursor: 'pointer' }}>Income</label>
                        </div>
                    </>
                )}
            </div>

            <button onClick={AddTransactionData}
                style={{
                    backgroundColor: '#44E610',
                    color: '#fff',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer'
                }}
            >
                Add Transaction
            </button>

        </div>
    );
};

export default AddTransaction;