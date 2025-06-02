import React, { useState } from 'react';
import Login from './Login';
import MainMenu from './MainMenu';
import Balance from './Balance';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import MiniStatement from './MiniStatement';

const API_BASE_URL = 'http://localhost:5000/api'; // Your Flask backend URL

function App() {
    const [currentUser, setCurrentUser] = useState(null); // { accountNumber: '...', name: '...' }
    const [currentScreen, setCurrentScreen] = useState('login');
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState(''); // To display welcome message

    const handleLogin = async (accountNumber, pin) => {
        setMessage(''); // Clear previous messages
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accountNumber, pin }),
            });
            const data = await response.json();

            if (data.success) {
                setCurrentUser({ accountNumber: data.accountNumber, name: data.name });
                setUserName(data.name);
                setCurrentScreen('mainMenu');
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage('Failed to connect to the server. Please try again.');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setUserName('');
        setCurrentScreen('login');
        setMessage('Thank you for using the ATM. Goodbye!');
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'login':
                return <Login onLogin={handleLogin} message={message} />;
            case 'mainMenu':
                return <MainMenu setScreen={setCurrentScreen} onLogout={handleLogout} userName={userName} />;
            case 'balance':
                return (
                    <Balance
                        accountNumber={currentUser?.accountNumber}
                        setScreen={setCurrentScreen}
                        setMessage={setMessage}
                    />
                );
            case 'deposit':
                return (
                    <Deposit
                        accountNumber={currentUser?.accountNumber}
                        setScreen={setCurrentScreen}
                        setMessage={setMessage}
                    />
                );
            case 'withdraw':
                return (
                    <Withdraw
                        accountNumber={currentUser?.accountNumber}
                        setScreen={setCurrentScreen}
                        setMessage={setMessage}
                    />
                );
            case 'statement':
                return (
                    <MiniStatement
                        accountNumber={currentUser?.accountNumber}
                        setScreen={setCurrentScreen}
                        setMessage={setMessage}
                    />
                );
            default:
                return <Login onLogin={handleLogin} message={message} />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">🏦 Python ATM Simulator</h1>
                {message && (
                    <div className={`p-3 mb-4 rounded-md ${message.includes('Welcome') ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                {renderScreen()}
            </div>
        </div>
    );
}

export default App;