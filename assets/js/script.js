// var buttonE1 = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskE1=function(taskDataObj){
  var listItemEl = document.createElement("li");
listItemEl.className = "task-item";
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);
tasksToDoEl.appendChild(listItemEl);
}

var taskFormHandler = function (event,taskDataObj) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var dropDownInput = document.querySelector("select[name='task-type']").value;
  if(!taskNameInput||!dropDownInput){
    alert("please insert valid input");
    return false;
  }
  formEl.reset();
  var taskDataObj={
    name:taskNameInput,
    type:dropDownInput,
  }
  createTaskE1(taskDataObj);
};

formEl.addEventListener("submit", taskFormHandler);
