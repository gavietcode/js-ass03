"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

display();

// Show information
function display() {
  // When data saved in userActive
  if (userActive) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";

    // Show welcome Message...
    welcomeMessage.textContent = `welcome ${userActive.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Are your sure for Logout...");

  // Return userActive is null
  if (isLogout) {
    userActive = null;

    saveToStorage("userActive", userActive);

    display();
  }
});
