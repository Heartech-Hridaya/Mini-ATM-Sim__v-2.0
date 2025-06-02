import time

# User database: account number as key
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

# Authenticate using account number and PIN
def authenticate():
    acc_num = input("Enter your account number: ").strip()
    pin = input("Enter your 4-digit PIN: ").strip()

    print("Authenticating...\n")
    time.sleep(1)

    if acc_num in users and users[acc_num]["pin"] == pin:
        print(f"✅ Welcome, {users[acc_num]['name']}!\n")
        return acc_num
    else:
        print("❌ Invalid account number or PIN.\n")
        return None

# Display main menu
def show_menu():
    print("==== Main Menu ====")
    print("1. 🧾 Check Balance")
    print("2. 💰 Deposit")
    print("3. 💸 Withdraw")
    print("4. 📄 Mini Statement")
    print("5. 🚪 Exit")

# Check balance
def check_balance(user):
    balance = users[user]['balance']
    print(f"Your current balance is Rs. {balance:,}")

# Deposit money
def deposit(user):
    try:
        amount = float(input("Enter amount to deposit: "))
        if amount <= 0:
            print("❌ Invalid amount.")
            return
        users[user]['balance'] += amount
        users[user]['transactions'].append(f"+ Rs. {amount:,} | {time.ctime()}")
        print(f"✅ Deposit successful. New balance: Rs. {users[user]['balance']:,}")
    except ValueError:
        print("❌ Please enter a valid number.")

# Withdraw money
def withdraw(user):
    try:
        amount = float(input("Enter amount to withdraw: "))
        if amount <= 0:
            print("❌ Invalid amount.")
            return
        if amount > users[user]['balance']:
            print("❌ Insufficient balance.")
        else:
            users[user]['balance'] -= amount
            users[user]['transactions'].append(f"- Rs. {amount:,} | {time.ctime()}")
            print(f"✅ Please collect your cash. Remaining balance: Rs. {users[user]['balance']:,}")
    except ValueError:
        print("❌ Please enter a valid number.")

# Show mini statement
def mini_statement(user):
    print("📄 Last 5 transactions:")
    last_5 = users[user]['transactions'][-5:]
    if not last_5:
        print("No transactions yet.")
    else:
        for txn in last_5:
            print("•", txn)

# Main function
def main():
    print("==== 🏦 Welcome to Python ATM Simulator ====")
    user = authenticate()
    if not user:
        return

    while True:
        show_menu()
        choice = input("\nChoose an option (1-5): ").strip()

        if choice == "1":
            check_balance(user)
        elif choice == "2":
            deposit(user)
        elif choice == "3":
            withdraw(user)
        elif choice == "4":
            mini_statement(user)
        elif choice == "5":
            print("👋 Thank you for using the ATM. Goodbye!")
            break
        else:
            print("❌ Invalid choice. Please try again.")
        print()

# Ensure script runs only when executed directly
if __name__ == "__main__":
    main()
