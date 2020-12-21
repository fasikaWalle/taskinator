// var buttonE1 = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
  event.preventDefault();
  // console.log(event);

  var listItemE1 = document.createElement("li");
  listItemE1.className = "task-item";
  listItemE1.textContent = "this is a new task.";
  tasksToDoEl.appendChild(listItemE1);
};
// buttonE1.addEventListener("click", createTaskHandler);
formEl.addEventListener("submit", createTaskHandler);
