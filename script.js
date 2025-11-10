
const btnAddTransactionPerson = document.getElementById("btnAddTransactionPerson");
const btnAddTransactionDeposit = document.getElementById("btnAddTransactionDeposit");
const btnNextPerson = document.getElementById("btnNextPerson");
const btnNextDeposit = document.getElementById("btnNextDeposit");
const btnBackToForm = document.getElementById("btnBackToForm");
const btnConfirm = document.getElementById("btnConfirm");


const formPerson = document.getElementById("formPerson");
const formDeposit = document.getElementById("formDeposit");
const formSummary = document.getElementById("formSummary");


const beneficiary = document.getElementById("beneficiary");
const amountPerson = document.getElementById("amountPerson");
const amountDeposit = document.getElementById("amountDeposit");


const summaryType = document.getElementById("summaryType");
const summaryTo = document.getElementById("summaryTo");
const summaryAmount = document.getElementById("summaryAmount");
const summaryDate = document.getElementById("summaryDate");


const transactionList = document.getElementById("transactionList");

let currentTransaction = {}; 


function showForm(form) {
    formPerson.classList.add("hidden");
    formDeposit.classList.add("hidden");
    formSummary.classList.add("hidden");

    form.classList.remove("hidden");
}


btnAddTransactionPerson.addEventListener("click", () => {
    currentTransaction = { type: "Person" };
    showForm(formPerson);
});


btnAddTransactionDeposit.addEventListener("click", () => {
    currentTransaction = { type: "Deposit" };
    showForm(formDeposit);
});


btnNextPerson.addEventListener("click", () => {
    if (!beneficiary.value || !amountPerson.value) {
        alert("Please fill all fields!");
        return;
    }
    currentTransaction.to = beneficiary.value;
    currentTransaction.amount = amountPerson.value;
    showSummary();
});


btnNextDeposit.addEventListener("click", () => {
    if (!amountDeposit.value) {
        alert("Please enter an amount!");
        return;
    }
    currentTransaction.to = "Deposit Account";
    currentTransaction.amount = amountDeposit.value;
    showSummary();
});


function showSummary() {
    summaryType.textContent = `Type: ${currentTransaction.type}`;
    summaryTo.textContent = `To: ${currentTransaction.to}`;
    summaryAmount.textContent = `Amount: ${currentTransaction.amount}`;
    summaryDate.textContent = `Date: ${new Date().toLocaleString()}`;
    showForm(formSummary);
}


btnBackToForm.addEventListener("click", () => {
    if (currentTransaction.type === "Person") showForm(formPerson);
    else showForm(formDeposit);
});


btnConfirm.addEventListener("click", () => {
    currentTransaction.date = new Date().toLocaleString();

    saveTransaction(currentTransaction);
    alert("Transaction saved successfully!");

 
    beneficiary.value = "";
    amountPerson.value = "";
    amountDeposit.value = "";
    currentTransaction = {};
    showForm(formPerson);

    renderTransactions();
});


function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}


function renderTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactionList.innerHTML = "";

    transactions.forEach((t) => {
        const card = document.createElement("div");
        card.className = `rounded-sm p-4 shadow-md w-full ${
            t.type === "Person" ? "bg-indigo-100" : "bg-green-100"
        }`;

        card.innerHTML = `
            <p><strong>Type:</strong> ${t.type}</p>
            <p><strong>To:</strong> ${t.to}</p>
            <p><strong>Amount:</strong> ${t.amount}</p>
            <p><strong>Date:</strong> ${t.date}</p>
        `;

        transactionList.appendChild(card);
    });
}


renderTransactions();
