import React, { useState, useEffect } from "react";

const Overview = ({ income, expense, balance }) => {
    const [netBalance, setNetBalance] = useState(balance + income - expense);
    const [error, setError] = useState("");
     useEffect(() => {
        const newBalance = balance + income - expense;
        setNetBalance(newBalance);

        if (newBalance < 0) {
            setError("Expense amount exceeds the current balance.");
        } else {
            setError(""); 
        }
    }, [balance, income, expense]);
    
    return (
        <div>
            <div style={{
               marginBottom: '25px',
                textAlign: 'center',
                border: '1px solid #000',
                borderRadius: '5px'
            }}>
                <div style={{
                    display: 'flex',
                    padding: '20px',
                }}>
                    <h2 style={{ fontWeight: '500' }}>
                        Balance <span style={{ fontWeight: 'bold' }}>₹{netBalance}</span>
                    </h2>
                </div>
                {error && (
                <div style={{
                    color: 'red',
                    textAlign: 'center',
                    marginBottom: '10px',
                    marginTop: '0px',
                }}>
                    {error}
                </div>
            )}
            </div>
            
        </div>
    );
};

export default Overview;