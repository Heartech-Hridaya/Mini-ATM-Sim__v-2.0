import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

function MiniStatement({ accountNumber, setScreen, setMessage }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!accountNumber) {
                setMessage('Error: Not logged in.');
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_BASE_URL}/transactions/${accountNumber}`);
                const data = await response.json();
                if (data.success) {
                    setTransactions(data.transactions);
                    setMessage('✅ Transactions fetched successfully.');
                } else {
                    setMessage(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error("Fetch transactions error:", error);
                setMessage('Failed to fetch transactions. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [accountNumber, setMessage]);

    return (
        <div className="screen mt-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Mini Statement</h2>
            {loading ? (
                <p className="text-gray-600">Loading transactions...</p>
            ) : transactions.length === 0 ? (
                <p className="text-gray-600">No transactions yet.</p>
            ) : (
                <ul className="bg-gray-50 border border-gray-200 rounded-md max-h-48 overflow-y-auto divide-y divide-gray-200">
                    {transactions.map((txn, index) => (
                        <li key={index} className="p-3 text-sm text-gray-700 font-mono text-left">
                            {txn}
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={() => setScreen('mainMenu')}
                className="mt-6 py-2 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition duration-150 ease-in-out"
            >
                Back to Main Menu
            </button>
        </div>
    );
}

export default MiniStatement;