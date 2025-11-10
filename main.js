console.log("kkkkkk");

function storeInfos() {
  const isMobile =
    window.getComputedStyle(document.querySelector(".container2")).display !==
    "none";

  const fullName = document.querySelector(
    isMobile ? "#phone-fullName" : "#fullName"
  );
  const CIN = document.querySelector(isMobile ? "#phone-CIN" : "#CIN");
  const phone = document.querySelector(
    isMobile ? "#phone-Telephone" : "#Telephone"
  );
  const SignEmail = document.querySelector(
    isMobile ? "#phone-Sign-email" : "#Sign-email"
  );
  const signPassword = document.querySelector(
    isMobile ? "#phone-signUp-password" : "#signUp-password"
  );
  const passwordConfirmation = document.querySelector("#password-confirmation");

  const userInfo = localStorage.getItem("infos")
    ? JSON.parse(localStorage.getItem("infos"))
    : [];

    const found = userInfo.find(
    (info) => info.email === SignEmail.value || info.fullName === fullName.value || info.CIN === CIN.value || info.telephone === phone.value 
  );

  if(found){
    Swal.fire({
      title: "something you entered already exist",
      text: "Please enter valid informations",
      icon: "error",
      confirmButtonText: "Try Again",
      background: "#fff",
      scrollbarPadding: false,
      allowEscapeKey: true,
    });
    return
  }

    
  if (
    !SignEmail.value.match(/@gmail.com/g) ||
    !signPassword.value.match(/^(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d)[A-Za-z\d]{8,}$/) ||
    !phone.value.match(/^06\d{8}$/) ||
    !CIN.value.match(/^[A-Z]{1,2}\d{4}$/)
  ) {
    Swal.fire({
      title: "Invalid informations!",
      text: "Please enter valid informations",
      icon: "error",
      confirmButtonText: "Try Again",
      background: "#fff",
      scrollbarPadding: false,
      allowEscapeKey: true,
    });
  } else {
    if (signPassword.value == passwordConfirmation.value) {
      Swal.fire({
        title: "your login was seccessful",
        icon: "success",
        confirmButtonText: "Ok",
        background: "#fff",
        scrollbarPadding: false,
        allowEscapeKey: true,
      }).then(() => {
        const person = {
          fullName: fullName.value,
          password: signPassword.value,
          telephone: phone.value,
          email: SignEmail.value,
          CIN: CIN.value,
          dateDeSignup: `${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }/${new Date().getDate()}`,
          RIBprincipale: `1079 ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} ${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)} 0005`,
          RIBepargne: `1079 ${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )}${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )} ${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )}${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )} ${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )}${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )} ${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )}${Math.floor(Math.random() * 9)}${Math.floor(
            Math.random() * 9
          )} 0005`,
        };
        console.log(person.RIBepargne);
        userInfo.push(person);
        localStorage.setItem("infos", JSON.stringify(userInfo));
        
        emailjs.send("service_qnkj0xs", "template_e6ij7x9", {
          name: person.fullName,
          email: person.email,
        });
      });
      window.location.href = "login.html";
    } else {
      Swal.fire({
        title: "please enter valid infos",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }
  }
}
console.log(document.querySelector(".container1"));
function validateInfos() {
  const isMobile =
    window.getComputedStyle(document.querySelector(".container2")).display !==
    "none";
  const password = document.querySelector(
    isMobile ? "#phone-password" : "#password"
  );
  const email = document.querySelector(isMobile ? "#phone-email" : "#email");

  console.log(email.value);
  console.log(password.value);
  const arr = JSON.parse(localStorage.getItem("infos")) || [];
  console.log(arr);
  const found = arr.find(
    (info) => info.email === email.value && info.password === password.value
  );
  console.log(found);

  if (found) {
    Swal.fire({
      title: "Login successful!",
      icon: "success",
      confirmButtonText: "Continue",
    }).then(() => {
      // window.location.href = "home.html";
    });
  } else {
    email.value = "";
    Swal.fire({
      title: "Invalid informations!",
      text: "Please check your email and password.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
    document.getElementById("warning").innerText =
      "it should be 8 letters at least and at least 1 upper or lower case caracter";
  }
}

const dropdown = document.querySelectorAll(".dropdown");
let arrow = document.getElementById("arrow");

dropdown.forEach(drop => {
  drop.addEventListener('click', () => {
  drop.classList.toggle('h-[83.5vh]');
  drop.classList.toggle('h-[6vh]');
  arrow.classList.toggle('rotate-x-180')
});
})

// khalid 



//zineb


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



