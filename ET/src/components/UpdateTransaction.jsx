import React, { useState } from "react";

const UpdateTransaction = ({ transaction, handleUpdateTransaction }) => {
    const [amount, setAmount] = useState(transaction.amount);
    const [event, setEvent] = useState(transaction.event);
    const [transType, setTransType] = useState(transaction.transType);
    const [error, setError] = useState("");

    const updateTransactionData = () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError("Please enter a valid amount.");
            return;
        }

        if (transType !== "balance" && !event) {
            setError("Event is required.");
            return;
        }
        const updatedTransaction = Object.assign({}, transaction, {
            amount: Number(amount),
            event,
            transType
        });
    
        handleUpdateTransaction(updatedTransaction);
        setError(""); 
    };

    return (
        <div style={{
            textAlign: 'center',
            border: '1px solid #000',
            padding: '20px',
            borderRadius: '5px',
            marginBottom: '25px',
            marginTop: '25px',
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
                    marginRight: '3px'
                }}
            />
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
                    marginLeft: '3px'
                }}
            />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
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
            </div>
            <button onClick={updateTransactionData}
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
                Update Transaction
            </button>
        </div>
    );
};

export default UpdateTransaction;