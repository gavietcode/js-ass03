"use strict";

// Need to login, so you can see
if (userActive) {
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  // Total of news
  let totalResults = 0;

  getDataNews("us", 1);

  async function getDataNews(country, page) {
    try {
      // Connect to API for get Data
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=e113bcc7b9b945de8581da0245bcc282`
      );
      const data = await res.json();

      // Check Error when used greater 100 times
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // Check Error when run file is not via server
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // Calle Function to show News
      displayNewList(data);
    } catch (error) {
      // Show Error
      alert(`Error: ${error.message}`);
    }
  }

  // Check Prev Button
  function checkBtnPrev() {
    // if page number is 1 so hide
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
    getDataNews("us", --pageNum.textContent);
  });

  // Catch Event of Next Button
  btnNext.addEventListener("click", function () {
    getDataNews("us", ++pageNum.textContent);
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
