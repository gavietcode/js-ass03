"use strict";

// Need to login for use it
if (userActive) {
  const navPageNum = document.getElementById("nav-page-num");
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  let totalResults = 0;
  let keywords = "";
  navPageNum.style.display = "none";

  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";

    // Check user so inputted keywords yet
    if (inputQuery.value.trim().length === 0) {
      navPageNum.style.display = "none";
      alert("Please input the keywords for find...");
    } else {
      keywords = inputQuery.value;

      // Show list of News
      getDataNewsByKeyWords(keywords, 1);
    }
  });

  async function getDataNewsByKeyWords(keywords, page) {
    try {
      // Connect to API for get Data
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=e113bcc7b9b945de8581da0245bcc282`
      );
      const data = await res.json();

      // Check Error when used greater 100 times
      if (data.status === "error" && data.code === "rateLimited") {
        // Hide button  if have Error
        navPageNum.style.display = "none";
        throw new Error(data.message);
      }

      // Do not have article for find
      if (data.totalResults == 0) {
        navPageNum.style.display = "none";
        throw new Error("Do not have article for find");
      }

      // Check Error when run file is not via server
      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // Show the result when find success
      navPageNum.style.display = "block";

      // Calle Function to show News
      displayNewList(data);
    } catch (error) {
      // Show Error
      alert(`Error: ${error.message}`);
    }
  }

  // Check condition for hide Prev Button
  function checkBtnPrev() {
    // When page number = 1 so hide
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  // Check Next Button
  function checkBtnNext() {
    // if page number = math.ceil of total news / page number
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  // Catch Event of Prev Button
  btnPrev.addEventListener("click", function () {
    getDataNewsByKeyWords("keywords", --pageNum.textContent);
  });

  // Catch Event of Next Button
  btnNext.addEventListener("click", function () {
    getDataNewsByKeyWords("keywords", ++pageNum.textContent);
  });

  function displayNewList(data) {
    // Get data for totalResults
    totalResults = data.totalResults;

    // Check Button of Pre and Next
    checkBtnNext();
    checkBtnPrev();

    // Create html code for News
    let html = "";
    data.articles.forEach(function (article) {
      html += `
      <div class="new-content">
        <div class="img-banner">
          <img src=${article.urlToImage ? article.urlToImage : "Not Show"}
          alt="img"/>
        </div>
        
        <div class="content">
          <h5>${article.title}</h5>
          <p>${article.description}</p>
          <button> <a href=${article.url} target="_blank">View</a> </button>
        </div>
      </div>
      `;
    });
    newsContainer.innerHTML = html;
  }
} else {
  alert("Please Login");
  window.location.assign("../index.html");
}
