"use strict";

// Function gets Data
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Function Saves Data
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Set Variable gets Data of userArr from LocalStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

// set Variable changes to Class Install
const userArr = users.map((user) => parseUser(user));

// Get Data of User inputting.
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : null;

// Get Data of Todo from LocalStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// set Variable changes to Class Install
const todoArr = todos.map((todo) => parseTask(todo));

// Function changes Js Object to Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
}
// Function changes Js Object to Class Instance
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);

  return task;
}
