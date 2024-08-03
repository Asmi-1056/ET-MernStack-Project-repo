import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";

const TransactionContainer = ({ transactions, removeTransaction, editTransaction }) => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    useEffect(() => {
        if (!searchInput.trim()) {
            setFilteredTransactions(transactions);
        } else {
            const filtered = transactions.filter(
                (item) =>
                    item.event.toLowerCase().includes(searchInput.toLowerCase().trim())
            );
            setFilteredTransactions(filtered);
        }
    }, [transactions, searchInput]);

    return (
        <div>
            <h2 style={{ fontSize: '25px', fontWeight: '600' }}>Transactions</h2>
            <input
                type="text"
                placeholder="Search here"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                    width: '93%',
                    padding: '15px 20px',
                    outline: 'none',
                    borderRadius: '5px',
                    margin: '5px 0',
                    border: '1px solid #e6e8e9',
                    backgroundColor: '#e6e8e9',
                    marginBottom: '25px'
                }}
            />
            <div>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                        <TransactionItem
                            transaction={transaction}
                            key={transaction.id}
                            removeTransaction={removeTransaction}
                            editTransaction={editTransaction}
                        />
                    ))
                ) : (
                    <p>No Transactions</p>
                )}
            </div>
        </div>
    );
};

export default TransactionContainer;