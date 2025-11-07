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

  console.log("mmmmmmmmm");
  const userInfo = localStorage.getItem("infos")
    ? JSON.parse(localStorage.getItem("infos"))
    : [];
  if (
    !SignEmail.value.match(/@gmail.com/g) ||
    !signPassword.value.match(
      /^(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*\d)[A-Za-z\d]{8,}$/
    ) ||
    !phone.value.match(/^06\d{8}$/) ||
    !CIN.value.match(/^[A-Z]{1,2}\d{4}$/)
  ) {
    Swal.fire({
      title: "Invalid informations!",
      text: "Please check your email and password.",
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
        confirmButtonText: "Try Again",
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
        };
        userInfo.push(person);
        localStorage.setItem("infos", JSON.stringify(userInfo));
        let a = document.createElement("a");
        a.href = "login.html";
        console.log("t9wd");
        emailjs.send("service_qnkj0xs", "template_e6ij7x9", {
          name: person.fullName,
          email: person.email,
        });
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
console.log(document.querySelector(".container1"))
function validateInfos() {
  const isMobile =
    window.getComputedStyle(document.querySelector(".container2")).display !==
    "none";
  const password = document.querySelector(
    isMobile ? "#phone-password" : "#password"
  );
  const email = document.querySelector(isMobile ? "#phone-email" : "#email");


  console.log(email.value);
  console.log(password.value)
  const arr = JSON.parse(localStorage.getItem("infos")) || [];
  console.log(arr)
  const found = arr.find(
    (info) => info.email === email.value && info.password === password.value
  );
  console.log(found)

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
