import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

function Balance({ accountNumber, setScreen, setMessage }) {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!accountNumber) {
                setMessage('Error: Not logged in.');
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_BASE_URL}/balance/${accountNumber}`);
                const data = await response.json();
                if (data.success) {
                    setBalance(data.balance);
                    setMessage('✅ Balance fetched successfully.');
                } else {
                    setMessage(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error("Fetch balance error:", error);
                setMessage('Failed to fetch balance. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchBalance();
    }, [accountNumber, setMessage]);

    return (
        <div className="screen mt-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Balance</h2>
            {loading ? (
                <p className="text-gray-600">Loading balance...</p>
            ) : (
                <p className="text-5xl font-bold text-green-600 my-8">Rs. {balance?.toLocaleString()}</p>
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

export default Balance;