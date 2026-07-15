const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");
const type = document.getElementById("type");


let totalBalance = 0;
let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

function updateBalance() {

    totalBalance = 0;
    totalIncome = 0;
    totalExpense = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {
            totalIncome = totalIncome + transaction.amount;
            totalBalance = totalBalance + transaction.amount;
        } else {
            totalExpense = totalExpense + transaction.amount;
            totalBalance = totalBalance - transaction.amount;
        }

    });

    balance.innerText = "₹" + totalBalance;
    income.innerText = "₹" + totalIncome;
    expense.innerText = "₹" + totalExpense;
}

function addTransactionToUI(transaction) {
    let sign = "";

    if (transaction.type === "income") {
        sign = "+";
    } else {
        sign = "-";
    }

    let li = document.createElement("li");

    if (transaction.type === "income") {
        li.classList.add("income-item");
    } else {
        li.classList.add("expense-item");
    }

    li.innerHTML =
    sign + " " +
    transaction.text +
    " - ₹" +
    transaction.amount +
    "<br><small>" +
    transaction.date +
    "</small>";
 
    

let deleteButton = document.createElement("button");
deleteButton.innerText = "Delete";
deleteButton.classList.add("delete-btn");

deleteButton.addEventListener("click", function () {
    removeTransaction(transaction.id);
});

    li.appendChild(deleteButton);
    list.appendChild(li);
}

function removeTransaction(id) {
    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });

    saveToLocalStorage();
    updateBalance();

    list.innerHTML = "";

    transactions.forEach(function (transaction) {
        addTransactionToUI(transaction);
    });
}



function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {

    let savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);

        updateBalance();

        transactions.forEach(function (transaction) {
            addTransactionToUI(transaction);
        });
    }
}
function addTransaction(event) {
    event.preventDefault();
let money = Number(amount.value);
let transactionType = type.value;

let transaction = {
    id: Date.now(),
    text: text.value,
    amount: money,
    type: transactionType,
    date: new Date().toLocaleString()
};

transactions.push(transaction);

saveToLocalStorage();

updateBalance();
addTransactionToUI(transaction);
  

    text.value = "";
    amount.value = "";




    console.log(text.value);
    console.log(amount.value);
}

form.addEventListener("submit", addTransaction);
loadTransactions();