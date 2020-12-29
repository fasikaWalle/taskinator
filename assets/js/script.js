// var buttonE1 = document.querySelector("#save-task");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var listItems = document.querySelector(".task-list");
var taskIdCounter = 0;
var createTaskE1 = function (taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  //adding custom data attribute t0 add taskidcounter to the list
  listItemEl.setAttribute("data-task-id", taskIdCounter);
  //create a draggable attribute to drag the element and drop to another place
  listItemEl.setAttribute("draggable", "true");
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  listItemEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  var taskActionsEl = createTaskActions(taskIdCounter);
  // console.log(taskActionsEl);
  listItemEl.appendChild(taskActionsEl);
  taskInfoEl.appendChild(listItemEl);
  tasksToDoEl.append(taskInfoEl);
  //cpunter plus to the next id
  taskIdCounter++;
};

//function who perform accepting the input and select value then sends as an object
var taskFormHandler = function (event, taskDataObj) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  var dropDownInput = document.querySelector("select[name='task-type']").value;
  if (!taskNameInput || !dropDownInput) {
    alert("please insert valid input");
    return false;
  }
  formEl.reset();
  var isEdit = formEl.hasAttribute("data-task-id");
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, dropDownInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: dropDownInput,
    };
    // var taskDataObj = {
    //   name: taskNameInput,
    //   type: dropDownInput,
    // };
    createTaskE1(taskDataObj);
  }
};
//functio
var createTaskActions = function (taskId) {
  //creating edit button and append to the div element
  var actionContainerE1 = document.createElement("div");
  actionContainerE1.className = "task-actions";
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerE1.appendChild(editButtonEl);
  //creating delete button and append to the div element
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.textContent = "delete";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerE1.appendChild(deleteButtonEl);
  //creating select element and add options to it
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerE1.appendChild(statusSelectEl);
  var statusChoices = ["tasks to do", "tasks in Progress", "tasks completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerE1;
};
//submit used to fire the button which is found in the form
var deleteButtonEl = document.createElement("button");
// deleteButtonEl.addEventListener("click", myFunction);
var pageContentEl = document.querySelector("#page-content");
function taskButtonHandler(event) {
  // console.log(event.target);
  //event.target used to find the element who trigger the event
  if (event.target.matches(".delete-btn")) {
    // console.log("you press delete");
    var taskId = event.target.getAttribute("data-task-id");
    // console.log(taskId);
    deleteTask(taskId);
  } else if (event.target.matches(".edit-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    editTask(taskId);
  }
}
var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  taskSelected.remove();
  // console.log(taskSelected);
};
var editTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  // console.log(taskName);
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  // console.log(taskType);
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  // var saveEdit = document.querySelector("#task-form");
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);
};
var completeEditTask = function (taskName, taskType, taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  formEl.removeAttribute("data-task-id");
};
//We technically already have a click event listener set up for the tasks' <select> elements thanks to the event delegation of taskButtonHandler(), which listens to events on the entire <main> element of the document. This click event doesn't really help us here, though, because a <select> click only fires on the initial click. Depending on the browser, the second click to choose an option fires on the <option> element instead of the <select> element. That sounds like a bigger headache to sort out than it's worth.the change event makes it possible to listen from options
var taskStatusChangeHandler = function (event) {
  console.log(event.target.value); // find task list item based on event.target's data-task-id attribute
  var taskId = event.target.getAttribute("data-task-id");
  console.log(taskId);
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  console.log(taskSelected);
  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  if (statusValue === "tasks to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "tasks in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "tasks completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};
function dropTaskHandler(event) {
  var taskId = event.dataTransfer.getData("plain/text");
  console.log(taskId);
  var draggableElement = document.querySelector(
    "[data-task-id= '" + taskId + "']"
  );

  var dropzone = event.target.closest(".task-list");
  var statusSelectEl = document.querySelector("select[name='status-change']");
  var statusType = dropzone.id;

  console.log(statusType);
  switch (statusType) {
    case "tasks-to-do":
      statusSelectEl.selectedIndex = 0;
      break;
    case "tasks-in-progress":
      statusSelectEl.selectedIndex = 1;
      break;
    case "tasks-completed":
      statusSelectEl.selectedIndex = 2;
      break;
    default:
      console.log("Something went wrong!");
      break;
  }
  dropzone.appendChild(draggableElement);
}
var dropZoneDragHandler = function (event) {
  var taskList = event.target.closest(".task-list");
  if (taskList) {
    event.preventDefault();
    taskList.setAttribute(
      "style",
      "background: rgba(68, 233, 255, 0.7); border-style: dashed;"
    );
  }
};

var dragTaskHandler = function (event) {
  console.log(event.target);
  var taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("plain/text", taskId);
};
function dragLeaveHandler(event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.target.closest(".task-list").removeAttribute("style");
  }
}

pageContentEl.addEventListener("drop", dropTaskHandler);
//Adding the parentheses will call this function immediately, so we pass the reference to the function as a callback, which is triggered by the event.
// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);
//for draggable
pageContentEl.addEventListener("dragstart", dragTaskHandler);

pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
// function add() {
//   return;
//   {
//     name: "fasika";
//   }
// }
// console.log(add());
// var x = 12;
// localStorage.setItem("number", "12");
// var y = localStorage.getItem("number");
// console.log(y);
