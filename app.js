var tasks = [];
var completedTasks = [];

// Function to add a new task
function addTask() {
  var taskInput = document.getElementById('taskInput');
  var task = taskInput.value.trim();

  if (task !== '') {
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
}

// Function to edit a pending task
function editTask(index) {
  var newTask = prompt('Enter a new task:');

  if (newTask !== null && newTask.trim() !== '') {
    tasks[index] = newTask.trim();
    renderTasks();
  }
}

// Function to mark a task as complete
function completeTask(index) {
  var completedTask = tasks.splice(index, 1);
  completedTasks.push(completedTask);
  renderTasks();
}

// Function to delete a completed task
function deleteTask(index) {
  completedTasks.splice(index, 1);
  renderTasks();
}

// Function to render the tasks
function renderTasks() {
  var taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  for (var i = 0; i < tasks.length; i++) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    var editButton = document.createElement('button');
    var completeButton = document.createElement('button');

    editButton.className += "ui primary button edit-button";
    completeButton.className += "ui green button complete-button";
    li.className += "no-bullets tasks-li";
    span.className += "tasks-text";

    span.textContent = tasks[i];
    editButton.textContent = 'Edit';
    completeButton.textContent = 'Complete';

    editButton.addEventListener('click', (function (index) {
      return function () {
        editTask(index);
      };
    })(i));

    completeButton.addEventListener('click', (function (index) {
      return function () {
        completeTask(index);
      };
    })(i));

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(completeButton);
    taskList.appendChild(li);
  }

  var completedTaskList = document.getElementById('completedTaskList');
  completedTaskList.innerHTML = '';

  for (var j = 0; j < completedTasks.length; j++) {
    var completedLi = document.createElement('li');
    var completedSpan = document.createElement('span');
    var deleteButton = document.createElement('button');

    deleteButton.className += "ui red button complete-button";
    completedLi.className += "no-bullets tasks-li";

    completedSpan.textContent = completedTasks[j];
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', (function (index) {
      return function () {
        deleteTask(index);
      };
    })(j));

    completedLi.appendChild(completedSpan);
    completedLi.appendChild(deleteButton);
    completedTaskList.appendChild(completedLi);
  }
}
