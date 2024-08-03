import React from "react";

const TransactionItem = ({ transaction, removeTransaction, editTransaction }) => {
    
    return (
        <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid #e6e8e9',
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    borderRight: `5px solid
                    ${transaction?.transType === "expense" ? "red" : "green"}`,
                    marginBottom: '10px',
                    cursor: 'pointer'
                    }}>
        <span>{transaction.event}</span>
        <span>₹{transaction.amount}</span>
        <div>
            <button style={{
                        backgroundColor: '#44E610',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginRight: '5px'
                    }}
                onClick={() => editTransaction(transaction)}
            >
                Update
            </button>
            <button style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                onClick={() => removeTransaction(transaction._id)}
            >
                Remove
            </button>
        </div>
        </div>
    );
};

export default TransactionItem;