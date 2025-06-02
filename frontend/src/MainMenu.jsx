import React from 'react';

function MainMenu({ setScreen, onLogout, userName }) {
    return (
        <div className="main-menu">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome, {userName}!</h2>
            <p className="text-lg text-gray-600 mb-6">Choose an option:</p>
            <ul className="space-y-3">
                <li
                    className="cursor-pointer bg-blue-50 hover:bg-blue-100 p-4 rounded-md text-blue-700 font-medium text-left shadow-sm transition duration-150 ease-in-out"
                    onClick={() => setScreen('balance')}
                >
                    🧾 Check Balance
                </li>
                <li
                    className="cursor-pointer bg-green-50 hover:bg-green-100 p-4 rounded-md text-green-700 font-medium text-left shadow-sm transition duration-150 ease-in-out"
                    onClick={() => setScreen('deposit')}
                >
                    💰 Deposit
                </li>
                <li
                    className="cursor-pointer bg-red-50 hover:bg-red-100 p-4 rounded-md text-red-700 font-medium text-left shadow-sm transition duration-150 ease-in-out"
                    onClick={() => setScreen('withdraw')}
                >
                    💸 Withdraw
                </li>
                <li
                    className="cursor-pointer bg-purple-50 hover:bg-purple-100 p-4 rounded-md text-purple-700 font-medium text-left shadow-sm transition duration-150 ease-in-out"
                    onClick={() => setScreen('statement')}
                >
                    📄 Mini Statement
                </li>
                <li
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-4 rounded-md text-gray-800 font-medium text-left shadow-sm transition duration-150 ease-in-out"
                    onClick={onLogout}
                >
                    🚪 Exit
                </li>
            </ul>
        </div>
    );
}

export default MainMenu;