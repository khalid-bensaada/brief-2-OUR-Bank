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
  const passwordConfirmation = document.querySelector(
    isMobile ? "#phone-password-confirmation" : "#password-confirmation"
  );

  const userInfo = localStorage.getItem("infos")
    ? JSON.parse(localStorage.getItem("infos"))
    : [];

  const found = userInfo.find(
    (info) =>
      info.email === SignEmail.value ||
      info.fullName === fullName.value ||
      info.CIN === CIN.value ||
      info.telephone === phone.value
  );

  if (found) {
    Swal.fire({
      title: "something you entered already exist",
      text: "Please enter valid informations",
      icon: "error",
      confirmButtonText: "Try Again",
      background: "#fff",
      scrollbarPadding: false,
      allowEscapeKey: true,
    });
    return;
  }

  if (
    !fullName.value.match(/[a-z]{4,}\s[a-z]{4,}/i) ||
    !SignEmail.value.match(/^[A-Za-z\d]{5,}@gmail.com$/) ||
    !signPassword.value.match(
      /^(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d)[A-Za-z\d]{8,}$/
    ) ||
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
          RIBprincipale: `1079 ${Math.floor(Math.random() * 9)}${Math.floor(
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
          idPrincipale:
            Math.ceil(Math.random() * 8) +
            "" +
            Math.ceil(Math.random() * 8) +
            "/" +
            Math.ceil(Math.random() * 8),
          idEpargne:
            Math.ceil(Math.random() * 8) +
            Math.ceil(Math.random() * 8) +
            "/" +
            Math.ceil(Math.random() * 8),
          soldePrincipale: "10 000 MAD",
          soldeEpargne: "00 MAD",
          Plafond: "100 000 MAD",
        };
        console.log(person.RIBepargne);
        userInfo.push(person);
        localStorage.setItem("infos", JSON.stringify(userInfo));

        emailjs.send("service_qnkj0xs", "template_e6ij7x9", {
          name: person.fullName,
          email: person.email,
        });
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);
      });
    } else {
      Swal.fire({
        title: "please enter valid infos",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }
  }
}

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
    (info) => info.email == email.value && info.password == password.value
  );
  console.log(found);

  localStorage.setItem("currentUser", JSON.stringify(found));

  if (found) {
    Swal.fire({
      title: "Login successful!",
      icon: "success",
      confirmButtonText: "Continue",
    }).then(() => {
      // setTimeout(() => {
      //   window.location.href = "home.html";
      // }, 500);
    });
  } else {
    email.value = "";
    Swal.fire({
      title: "Invalid informations!",
      text: "Please check your email and password.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }
}

function annuleSignup() {
  Swal.fire({
    title: "Are you sure you want to Quit?",
    icon: "question",
    confirmButtonText: "yes",
    cancelButton: true,
  });
}

function toggleMobileDropdown(id) {
  const dropdown = document.getElementById(id);
  const arrow = document.getElementById("arrow" + id.slice(-1));

  if (dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px") {
    dropdown.style.maxHeight = "0px";
    arrow.style.transform = "rotate(0deg)";
  } else {
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";
    arrow.style.transform = "rotate(180deg)";
  }
}
function toggleDesktopDropdown(id) {
  const dropdown = document.getElementById(id);
  const content = dropdown.querySelector(".desktop-content");
  const arrowId = id.replace("desktopDropdown", "desktopArrow");
  const arrow = document.getElementById(arrowId);

  if (content.style.display === "none") {
    content.style.display = "block";
    arrow.style.transform = "rotate(180deg)";
  } else {
    content.style.display = "none";
    arrow.style.transform = "rotate(0deg)";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 1024) {
    const dropdown1 = document.getElementById("dropdown1");
    if (dropdown1) {
      dropdown1.style.maxHeight = dropdown1.scrollHeight + "px";
    }
  }
});

function tout() {
  let Virements = JSON.parse(localStorage.getItem("transactions")) || [];
  let recharge = JSON.parse(localStorage.getItem("recharge")) || [];
  let btntout = document.querySelectorAll(".tout");
  let buttons = document.querySelectorAll("button");

  getActiveButton(buttons, btntout);

  let containers = document.querySelectorAll(".desktop-content");

  // recharge.forEach((element)=>{
  //   let content = `<div class="border-t border-gray-300 p-4">
  //                           <div class="flex gap-3 items-start mb-4">
  //                               <div
  //                                   class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
  //                                   <img src="/images/Frame 38.svg" alt="">
  //                               </div>
  //                               <div class="flex-1">
  //                                   <h3 class="font-semibold">Recharge</h3>
  //                                   <p class="text-sm text-gray-500">Vers: ${element.to}</p>
  //                                   <p class="text-sm text-gray-500">Date: ${element.date}</p>
  //                                   <p class="text-sm text-gray-500">Ref: ${element.type}</p>
  //                               </div>
  //                               <span class="text-orange-400 text-lg font-semibold">${element.amount}.00 MAD</span>
  //                           </div>
  //                       </div>`;
  // })

  containers.forEach((container) => {
    let content = `<div class="border-t border-gray-300 p-4 card" id='cards'>
                            <div class="flex gap-3 items-start mb-4">
                                <div
                                    class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <img src="/images/Frame 37.svg" alt="">
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold">Virements</h3>
                                    <p class="text-sm text-gray-500">Vers: ${Virements[0].to}</p>
                                    <p class="text-sm text-gray-500">Date: ${Virements[0].date}</p>
                                    <p class="text-sm text-gray-500">Ref: ${Virements[0].type}</p>
                                </div>
                                <span class="text-red-500 text-lg font-semibold">-${Virements[0].amount}.00 MAD</span>
                            </div>
                        </div>`;

    let div = document.createElement("div");
    div.innerHTML = content;
    console.log(div);
    let card = document.getElementById("cards");
    console.log(content);

    container.replaceChildren(div);
  });
}

function Virements() {
  let transaction = JSON.parse(localStorage.getItem("transactions")) || [];
  let recharge = JSON.parse(localStorage.getItem("recharge")) || [];
  let btnVirements = document.querySelectorAll(".Virements");
  let buttons = document.querySelectorAll("button");
  let containers = document.querySelectorAll(".desktop-content");

  getActiveButton(buttons, btnVirements);
  displayFromLocalSrorage(containers,transaction,"virements","/images/Frame 37.svg");
}

window.addEventListener("DOMContentLoaded", tout());

function displayFromLocalSrorage(containers, transaction, id, src) {
  console.log(id)
  containers.forEach((container) => {
    transaction.forEach((element) => {
      let content = `<div class="border-t border-gray-300 p-4 card" id=${id}>
                            <div class="flex gap-3 items-start mb-4">
                                <div
                                    class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <img src="${src}" alt="">
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold">Virements</h3>
                                    <p class="text-sm text-gray-500">Vers: ${element.to}</p>
                                    <p class="text-sm text-gray-500">Date: ${element.date}</p>
                                    <p class="text-sm text-gray-500">Ref: ${element.type}</p>
                                </div>
                                <span class="text-red-500 text-lg font-semibold">-${element.amount}.00 MAD</span>
                            </div>
                        </div>`;

      let div = document.createElement("div");
      div.innerHTML = content;
      let variable = document.getElementById(`${id}`);
      console.log(variable)

      console.log(transaction.length);
      console.log(container);

      if (container.children.length < transaction.length) {
        if (variable) {
          container.appendChild(div);
        } else {
          container.replaceChildren(div);
        }
        console.log(container)
      }
    });
  });
}

function getActiveButton(arr, button) {
  let active = arr.forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
      button.forEach((btn) => {
        btn.classList.add("active");
      });
    }
  });
}

// khalid

let operator = document.getElementById("operator")
const phoneNumber = document.getElementById("phoneNumber");
const price = document.getElementById("price");
const type = document.getElementById("type");
const dateRecharge = document.getElementById("dateRecharge");
const add = document.getElementById("add");
const concelIt = document.getElementById("concelIt");

// for get same solde from the sold principal 
let changSolde ;

// click on button of validation 

add.addEventListener('click', function(){

  if (operator.value != "" || phoneNumber.value != ""   ||  price.value != ""  || type.value != ""  || dateRecharge.value!= "" ){
    alert("seccecefull add");
  }
})

let phoneRegex = /^+212[5-7]\d{8}$/;

if (phoneRegex.test(phoneNumber.value)){
  alert("namber valid")
}else{
  alert("envalid number")
}








//zineb

if (window.location.pathname == "/transactions.html") {
  const btnAddTransactionPerson = document.getElementById(
    "btnAddTransactionPerson"
  );
  const btnAddTransactionDeposit = document.getElementById(
    "btnAddTransactionDeposit"
  );

  console.log(btnAddTransactionDeposit);

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

  let currentTransaction = [];

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
}
console.log(window.location);

// Recharge&Factures

const btnElectricity = document.getElementById("btnElectricity");
const btnWater = document.getElementById("btnWater");
const btnCarInsurance = document.getElementById("btnCarInsurance");
const btnTax = document.getElementById("btnTax");
const inputContrat = document.getElementById("inputContrat");
const inputAmount = document.getElementById("inputAmount");
const inputDateFacture = document.getElementById("inputDateFacture");

let RiB = document.getElementById("RIB");
let Id = document.getElementById("id");
let owner = document.getElementById("owner");
let infoContainer = document.getElementById("info-container");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);
let content = `<h1 class="text-[0.9rem]" id="RIB">${currentUser.RIBprincipale}</h1>
                                <p class="text-[0.8rem] text-gray-400" id="id">${currentUser.CIN}</p>
                                <p class="" id="owner">${currentUser.fullName}</p>`;
infoContainer.innerHTML = content;



