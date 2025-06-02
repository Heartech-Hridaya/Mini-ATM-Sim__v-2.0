import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

function Withdraw({ accountNumber, setScreen, setMessage }) {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            setMessage('Please enter a valid positive amount.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accountNumber, amount: withdrawAmount }),
            });
            const data = await response.json();

            if (data.success) {
                setMessage(`✅ Withdrawal successful. Remaining balance: Rs. ${data.newBalance.toLocaleString()}`);
                setAmount('');
                setScreen('mainMenu');
            } else {
                setMessage(`❌ Withdrawal failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Withdraw error:", error);
            setMessage('Failed to connect to the server for withdrawal.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="screen mt-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Withdraw</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="withdrawAmount" className="block text-left text-sm font-medium text-gray-700 mb-1">Amount to Withdraw:</label>
                    <input
                        type="number"
                        id="withdrawAmount"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                        step="0.01"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="submit"
                        className="py-2 px-6 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-150 ease-in-out"
                        disabled={loading}
                    >
                        {loading ? 'Withdrawing...' : 'Withdraw'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setScreen('mainMenu'); setMessage(''); }}
                        className="py-2 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition duration-150 ease-in-out"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Withdraw;