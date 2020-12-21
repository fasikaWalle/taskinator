var buttonE1 = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
  var listItemE1 = document.createElement("li");
  listItemE1.className = "task-item";
  listItemE1.textContent = "this is a new task.";
  tasksToDoEl.appendChild(listItemE1);
};
buttonE1.addEventListener("click", createTaskHandler);

var headerContainer = document.querySelector("#header");
var formSubmit = document.createElement("form");
formSubmit.createElement("input");
formSubmit.createElement("button");
formSubmit.innerHTML = "hello";
headerContainer.appendChild(formSubmit);
