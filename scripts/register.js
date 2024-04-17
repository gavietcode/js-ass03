"use strict";

// Get Doms
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

// Catch Event for Register btn
btnSubmit.addEventListener("click", function () {
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value
  );

  const isValidate = validate(user);

  if (isValidate) {
    // Add user into userArr
    userArr.push(user);

    // Save Data
    saveToStorage("userArr", userArr);

    // Show success
    alert("You are Done");

    // Data links to login Page

    window.location.assign("../pages/login.html");
  }
});

console.log(saveToStorage);
// Validate Function
function validate(user) {
  // Start with true Variable
  let isValidateData = true;

  if (inputFirstName.value.trim().length === 0) {
    alert("Please input your FirstName...");
    isValidateData = false;
  }

  if (inputLastName.value.trim().length === 0) {
    alert("Please input your LastName...");
    isValidateData = false;
  }

  if (inputUserName.value.trim().length === 0) {
    alert("Please input your UserName...");
    isValidateData = false;
  }

  if (user.password === "") {
    alert("Please input your Password...");
    isValidateData = false;
  }

  if (inputPasswordConfirm.value === "") {
    alert("Please input your ConfirmPassword...");
    isValidateData = false;
  }

  // Check Username

  if (
    !userArr.every((item) => (item.userName !== user.userName ? true : false))
  ) {
    alert("User Name must unique...");
    isValidateData = false;
  }

  if (inputPassword.value !== inputPasswordConfirm.value) {
    alert("Password and ConfirmPassword are different...");
    isValidateData = false;
  }

  if (user.password.length <= 8) {
    alert("Password must be greater 8 character...");
    isValidateData = false;
  }
  return isValidateData;
}
