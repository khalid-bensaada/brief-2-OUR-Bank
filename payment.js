// ===============================
// Helper: Show alerts
// ===============================
function showAlert(message, type = "success") {
    const colors = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500"
    };

    const alertBox = document.createElement("div");
    alertBox.className = `${colors[type]} text-white px-4 py-2 rounded-md fixed top-5 right-5 shadow-lg z-50`;
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 2500);
}

// ===============================
// Recharge Section
// ===============================
const operatorButtons = document.querySelectorAll("button[id^='btn']");
const operatorSelect = document.querySelector("select");

// Highlight clicked operator & update dropdown
operatorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        operatorButtons.forEach((x) => x.classList.remove("text-black", "font-bold"));
        btn.classList.add("text-black", "font-bold");

        const op = btn.textContent.trim();
        operatorSelect.value = op;
    });
});

// Recharge form fields
const rechargeFields = {
    operator: document.querySelector("select"),
    phone: document.querySelector("input[placeholder='+212...']"),
    price: document.querySelector("select:nth-of-type(2)"),
    type: document.querySelector("select:nth-of-type(3)"),
    date: document.querySelector("input[type='date']")
};

// Recharge buttons
const rechargeValidateBtn = document.querySelector("button:hover:bg-green-300");
const rechargeCancelBtn = document.querySelector("button:hover:bg-red-300");

// Save Recharge
function saveRecharge() {
    const rechargeData = {
        operator: rechargeFields.operator.value,
        phone: rechargeFields.phone.value,
        price: rechargeFields.price.value,
        type: rechargeFields.type.value,
        date: rechargeFields.date.value
    };

    // Validation
    if (!rechargeData.phone || rechargeData.phone.length < 9) {
        showAlert("Phone number is invalid!", "error");
        return;
    }
    if (!rechargeData.date) {
        showAlert("Please choose a date!", "error");
        return;
    }

    // Save to localStorage
    let stored = JSON.parse(localStorage.getItem("recharges") || "[]");
    stored.push(rechargeData);
    localStorage.setItem("recharges", JSON.stringify(stored));

    showAlert("Recharge added successfully!");

    // Clear inputs
    rechargeFields.phone.value = "";
    rechargeFields.date.value = "";
}

// Cancel Recharge
function clearRecharge() {
    rechargeFields.phone.value = "";
    rechargeFields.date.value = "";
    showAlert("Recharge cancelled", "info");
}

rechargeValidateBtn.addEventListener("click", saveRecharge);
rechargeCancelBtn.addEventListener("click", clearRecharge);

// ===============================
// Invoice Section
// ===============================
const factureButtons = document.querySelectorAll(".btnFacture");

factureButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        factureButtons.forEach((x) => x.classList.remove("text-blue-400", "font-bold"));
        btn.classList.add("text-blue-400", "font-bold");
    });
});

// Invoice fields
const invoiceFields = {
    contrat: document.querySelector("input[placeholder='123456']"),
    amount: document.querySelector("input[type='number']:not([placeholder='+212...'])"),
    date: document.querySelector("input[type='date']:not(.recharge)")
};

// Buttons
const invoicePayBtn = document.querySelector("#btnPayDesktop");
const invoiceCancelBtn = document.querySelector("#btnCancelTow");

function saveFacture() {
    const factureData = {
        contrat: invoiceFields.contrat.value,
        amount: invoiceFields.amount.value,
        date: invoiceFields.date.value
    };

    // Validation
    if (!factureData.contrat || factureData.contrat.length < 3) {
        showAlert("Contract number invalid!", "error");
        return;
    }
    if (!factureData.amount || factureData.amount <= 0) {
        showAlert("Amount invalid!", "error");
        return;
    }
    if (!factureData.date) {
        showAlert("Please choose a date!", "error");
        return;
    }

    // Save to localStorage
    let stored = JSON.parse(localStorage.getItem("factures") || "[]");
    stored.push(factureData);
    localStorage.setItem("factures", JSON.stringify(stored));

    showAlert("Invoice saved successfully!");

    // Clear fields
    invoiceFields.contrat.value = "";
    invoiceFields.amount.value = "";
    invoiceFields.date.value = "";
}

function cancelFacture() {
    invoiceFields.contrat.value = "";
    invoiceFields.amount.value = "";
    invoiceFields.date.value = "";
    showAlert("Invoice cancelled", "info");
}

invoicePayBtn.addEventListener("click", (e) => {
    e.preventDefault();
    saveFacture();
});

invoiceCancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cancelFacture();
});
