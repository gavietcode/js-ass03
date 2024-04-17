"use strict";

// Need to Login for use Todo
if (userActive) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();

  // Function shows todo list
  function displayTodoList() {
    let html = "";

    // Filter task of user inputting for show on webpage.
    todoArr
      .filter((todo) => todo.owner === userActive.userName) // We have array contains the task of user
      .forEach(function (todo) {
        html += `
      <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">x</span></li>
      `;
      });
    todoList.innerHTML = html;

    // Catch Events
    eventToggleTask();
    eventDeleteTask();
  }

  // Catch Event of btnAdd for Add Task
  btnAdd.addEventListener("click", function () {
    // Check Validate
    if (inputTask.value.trim().length === 0) {
      alert("Please input your task...");
    } else {
      const todo = new Task(inputTask.value, userActive.userName, false);

      // Add task to array
      todoArr.push(todo);

      // Save to localStorage
      saveToStorage("todoArr", todoArr);

      // Show data
      displayTodoList();

      // Clear information after input
      inputTask.value = "";
    }
  });

  // Catch Event of Toggle Tasks
  function eventToggleTask() {
    // Get li Elements of Task and catch Events
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        // Avoid deleted button for do not overlap
        if (e.target !== liEl.children[0]) {
          // Toggle class checked
          liEl.classList.toggle("checked");

          // Find task just click
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === userActive.userName &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );

          // After change attribute of isDone
          todo.isDone = liEl.classList.contains("checked") ? true : false;

          // end then save to local storage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  // Catch delete Event of task
  function eventDeleteTask() {
    // Get delete Button and catch event for each element
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // Ask for confirm for Delete
        const isDelete = confirm("Are your sure for Delete...");

        // Confirm for Delete
        if (isDelete) {
          // Find the place of task pressed the Delete
          const index = todoArr.findIndex(
            (item) =>
              item.owner === userActive.userName &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );

          // Delete Task in todoArr
          todoArr.splice(index, 1);
          // Save
          saveToStorage("todoArr", todoArr);
          // Show
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Please Login for access...");
  window.location.assign("../index.html");
}
