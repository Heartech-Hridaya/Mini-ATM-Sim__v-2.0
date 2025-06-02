import React, { useState } from 'react';

function Login({ onLogin, message }) {
    const [accountNumber, setAccountNumber] = useState('');
    const [pin, setPin] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(accountNumber, pin);
    };

    return (
        <div className="login-form">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="accountNumber" className="block text-left text-sm font-medium text-gray-700 mb-1">Account Number:</label>
                    <input
                        type="text"
                        id="accountNumber"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pin" className="block text-left text-sm font-medium text-gray-700 mb-1">PIN:</label>
                    <input
                        type="password"
                        id="pin"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        maxLength="4"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;