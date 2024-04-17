"use strict";

// Get DOM
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// Catch Event
btnSubmit.addEventListener("click", function () {
  // Check Login
  const isValidate = validate();

  // If Validate
  if (validate) {
    const user = userArr.find(
      (item) =>
        item.userName === inputUserName.value &&
        item.password === inputPassword.value
    );

    if (user) {
      alert("Login success...");

      saveToStorage("userActive", user);

      window.location.assign("../index.html");
    } else {
      alert("Login error...");
    }
  }
});

function validate() {
  let isValidateData = true;

  if (inputUserName.value === "") {
    alert("Please input User Name...");
    isValidateData = false;
  }

  if (inputPassword.value === "") {
    alert("Please input Password...");
    isValidateData = false;
  }
}
