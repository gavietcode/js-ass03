"use strict";

if (userActive) {
  const inputPageSize = document.getElementById("input-page-size");
  const inoutCategory = document.getElementById("input-category");
  const btnsubmit = document.getElementById("btn-submit");

  // Catch Event
  btnsubmit.addEventListener("click", function () {
    if (validate()) {
      // Update userActive for one time
      userActive.pageSize = Number.parseInt(inputPageSize.value);
      userActive.category = inoutCategory.value;
      saveToStorage("userActive", userActive);

      // Updadte userArr Array
      const index = userArr.findIndex(
        (userItem) => userItem.userName === userActive.userName
      );
      userArr[index] = userActive;

      // Save
      saveToStorage("userArr", userArr);

      // Reset input Form and Show Done
      inputPageSize.value = "";
      inoutCategory.value = "General";
    }
  });

  // Validate Function
  function validate() {
    let isValidate = true;

    // Check inputPageSize
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("Information is not Validate");
      isValidate = false;
    }
    if (inoutCategory.value === "") {
      alert("Please input Category...");
      isValidate = false;
    }
    return isValidate;
  }

  // if not yet login so will show alert...
} else {
  alert("Please login before using it...");
  window.location.assign("../index.html");
}
