"use strict";

// Info of User
class User {
  constructor(
    firstName,
    lastName,
    userName,
    password,
    pageSize = 10,
    category = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}

// Contain the information of Todo;
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
