from flask import Flask, request, jsonify
from flask_cors import CORS
import time # You might not need time.sleep in a real API, but keeping for consistency

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# User database (simulate a database for now)
users = {
    "1001100223": {
        "name": "Bishow Mishra",
        "pin": "1234",
        "balance": 50000,
        "transactions": []
    },
    "1002100112": {
        "name": "Hridaya Manandhar",
        "pin": "5678",
        "balance": 80000,
        "transactions": []
    },
    "1003100412": {
        "name": "Anil Nepali",
        "pin": "2580",
        "balance": 90000,
        "transactions": []
    },
    "1005100912": {
        "name": "Prateek",
        "pin": "1470",
        "balance": 81000,
        "transactions": []
    }
}

# In a real app, you'd manage sessions/tokens, not pass acc_num around directly.
# For simplicity, we'll assume the frontend sends the acc_num for each request
# after initial login, or you could implement a basic token system.

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    acc_num = data.get('accountNumber')
    pin = data.get('pin')

    if acc_num in users and users[acc_num]["pin"] == pin:
        # In a real app, you'd generate and return an auth token here
        return jsonify({"success": True, "message": f"Welcome, {users[acc_num]['name']}!", "accountNumber": acc_num, "name": users[acc_num]['name']})
    else:
        return jsonify({"success": False, "message": "Invalid account number or PIN."}), 401 # 401 Unauthorized

@app.route('/api/balance/<account_number>', methods=['GET'])
def get_balance(account_number):
    if account_number in users:
        return jsonify({"success": True, "balance": users[account_number]["balance"]})
    return jsonify({"success": False, "message": "Account not found."}), 404

@app.route('/api/deposit', methods=['POST'])
def deposit():
    data = request.get_json()
    acc_num = data.get('accountNumber')
    amount = data.get('amount')

    if acc_num not in users:
        return jsonify({"success": False, "message": "Account not found."}), 404
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({"success": False, "message": "Invalid deposit amount."}), 400

    user = users[acc_num]
    user['balance'] += amount
    user['transactions'].append(f"+ Rs. {amount:,} | {time.ctime()}")
    return jsonify({"success": True, "message": "Deposit successful.", "newBalance": user['balance']})

@app.route('/api/withdraw', methods=['POST'])
def withdraw():
    data = request.get_json()
    acc_num = data.get('accountNumber')
    amount = data.get('amount')

    if acc_num not in users:
        return jsonify({"success": False, "message": "Account not found."}), 404
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({"success": False, "message": "Invalid withdrawal amount."}), 400

    user = users[acc_num]
    if amount > user['balance']:
        return jsonify({"success": False, "message": "Insufficient balance."}), 400
    
    user['balance'] -= amount
    user['transactions'].append(f"- Rs. {amount:,} | {time.ctime()}")
    return jsonify({"success": True, "message": "Withdrawal successful.", "newBalance": user['balance']})

@app.route('/api/transactions/<account_number>', methods=['GET'])
def get_transactions(account_number):
    if account_number in users:
        # Return last 5, or fewer if not available
        return jsonify({"success": True, "transactions": users[account_number]['transactions'][-5:]})
    return jsonify({"success": False, "message": "Account not found."}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000) # Run on port 5000