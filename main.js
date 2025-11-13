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
          dateDeSignup: `${new Date().getFullYear()}/${new Date().getMonth() + 1
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
          soldePrincipale: `${10000} MAD`,
          soldeEpargne: `${0} MAD`,
          Plafond: `${10000} MAD`,
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
  let virements = JSON.parse(localStorage.getItem("transactions")) || [];
  let recharges = JSON.parse(localStorage.getItem("save")) || [];
  let btntout = document.querySelectorAll(".tout");
  let buttons = document.querySelectorAll("button");

  let containers = document.querySelectorAll(".desktop-content");

  Recharge();
  Virements();
  getActiveButton(buttons, btntout);
}

window.addEventListener("DOMContentLoaded", tout());

function Recharge() {
  const recharges = JSON.parse(localStorage.getItem("save")) || [];
  const buttons = document.querySelectorAll("button");
  const btnPaiements = document.querySelectorAll(".Recharges");
  const containers = document.querySelectorAll(".desktop-content");

  getActiveButton(buttons, btnPaiements);
  displayFromLocalStorage(
    containers,
    recharges,
    "paiment",
    "/images/Frame 38.svg"
  );
}

function Virements() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const buttons = document.querySelectorAll("button");
  const btnVirements = document.querySelectorAll(".Virements");
  const containers = document.querySelectorAll(".desktop-content");

  getActiveButton(buttons, btnVirements);
  displayFromLocalStorage(
    containers,
    transactions,
    "virements",
    "/images/Frame 37.svg"
  );
}

function displayFromLocalStorage(containers, transactions, id, src) {
  containers.forEach((container) => {
    container.innerHTML = ""; // clear previous entries
    transactions.forEach((element) => {
      const content = `
        <div class="border-t border-gray-300 p-4 card" id="${id}">
          <div class="flex gap-3 items-start mb-4">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <img src="${src}" alt="">
            </div>
            <div class="flex-1">
              <h3 class="font-semibold">${id === "virements" ? "Virement" : "Paiement"
        }</h3>
              <p class="text-sm text-gray-500">Vers: ${element.to || element.number || "N/A"
        }</p>
              <p class="text-sm text-gray-500">Date: ${element.date || "—"}</p>
              <p class="text-sm text-gray-500">Ref: ${element.type || element.typ || "—"
        }</p>
            </div>
            <span class="text-red-500 text-lg font-semibold">-${element.amount || element.prix || "0"
        }.00 MAD</span>
          </div>
        </div>
      `;

      container.insertAdjacentHTML("beforeend", content);
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

let notifIcon = document.querySelector(".notifIcon");
let ctr = 0;

notifIcon.addEventListener("click", () => {
  let notification = document.querySelector(".notification");
  notification.classList.toggle('opacity-100')
  notification.classList.contains('opacity-100') ?
    notification.style.top = '15px' : notification.style.top = '0px'


});

// khalid

if (window.location.pathname == "/facture&Recharge.html") {
  let operator = document.getElementById("operator");
  const phoneNumber = document.getElementById("phoneNumber");
  const price = document.getElementById("price");
  const type = document.getElementById("type");
  const dateRecharge = document.getElementById("dateRecharge");
  const add = document.getElementById("add");
  const concelIt = document.getElementById("concelIt");

  // for get same solde from the sold principal
  let changSolde;

  function saveLocal(saved) {
    let save = JSON.parse(localStorage.getItem("save")) || [];
    save.push(saved);
    localStorage.setItem("save", JSON.stringify(save));
  }

  // click on button of validation

  add.addEventListener("click", function (e) {
    if (
      operator.value != "" ||
      phoneNumber.value != "" ||
      price.value != "" ||
      type.value != "" ||
      dateRecharge.value != ""
    ) {
      alert("seccecefull add");
    }

    let phoneRegex = "/^+212[5-7]d{8}$/";

    if (phoneRegex.match(phoneNumber.value)) {
      alert("namber valid");
    } else {
      alert("envalid number");
    }

    const saved = {
      operation: operator.value,
      number: phoneNumber.value,
      prix: price.value,
      typ: type.value,
      date: dateRecharge.value,
    };

    saveLocal(saved);

    alert("seccesfully saved");

    operator.value = 0;
    phoneNumber.value = "";
    price.value = 0;
    type.value = 0;
    dateRecharge.value = "";
  });

  concelIt.addEventListener("click", function () {
    operator.value = 0;
    phoneNumber.value = "";
    price.value = 0;
    type.value = 0;
    dateRecharge.value = "";
  });
}

let rib = localStorage.getItem("RIBprincipale");
document.getElementById("rib").textContent = rib;

const full = localStorage.getItem("fullName");
document.getElementById("noom").textContent = full;

let soold = localStorage.getItem("soldePrincipale");
document.getElementById("total").textContent = soold;

let funa = localStorage.getItem("fullName");
document.getElementById("funa").textContent = funa;

let cni = localStorage.getItem("CIN");
document.getElementById("cni").textContent = cni;

let mal = localStorage.getItem("email");
document.getElementById("mal").textContent = mal;

let pnumber = localStorage.getItem("telephone");
document.getElementById("pnumber").textContent = pnumber;

document.getElementById("createPdf").addEventListener('click', function () {

  window.print();
});


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
      card.className = `rounded-sm p-4 flex justify-between w-full shadow-md  ${t.type === "Person" ? "bg--100" : "bg--100"
        }`;

      card.innerHTML = `
             <div>
              <p><strong>To:</strong> ${t.to}</p>
              <p><strong>Amount:</strong> ${t.amount}</p>
             </div>
             <div>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#FFD43B" d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
             </div>
        
             
        `;

      transactionList.appendChild(card);
    });
  }

  renderTransactions();
}

// Factures

if (window.location.pathname == "/cardes.html.html") {
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
}
