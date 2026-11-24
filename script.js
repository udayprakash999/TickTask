// variables
const inputForm = document.querySelector(".input-form");
const editForm = document.querySelector(".edit-form");
const openInput = document.getElementById("openInput");
const ticktaskInput = document.getElementById("inputModal");
const ticktaskEdit = document.getElementById("editModal");
const closeBtn = document.querySelector(".closeBtn");
const closeBtnEd = document.querySelector(".closeBtnEd");
const taskWrapper = document.querySelector(".task-wrapper");
const pendingTask = document.getElementById("pendingTask");
const completedTask = document.getElementById("completedTask");
const filterBtns = document.querySelectorAll(".filterBtn");

let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

openInput.addEventListener("click", () => {
  ticktaskInput.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  ticktaskInput.classList.remove("active");
});
closeBtnEd.addEventListener("click", () => {
  ticktaskEdit.classList.remove("active");
});
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(inputForm);
  let formEntries = Object.fromEntries(formData.entries());
  submitForm(formEntries);
  inputForm.reset();
});
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(editForm);
  let formEntries = Object.fromEntries(formData.entries());
  updateTask(formEntries, ticktaskEdit.id);
  editForm.reset();
});
function updateTask(data, id) {
  if (toEdit) {
    const toEdit = submissions.find((task) => task.id === id);
    toEdit.title = data.title;
    toEdit.description = data.description;
    ticktaskEdit.classList.remove("active");
    saveTasks();
    showTasks(submissions);
  } else return
}
function submitForm(data) {
  let title = data.title;
  let description = data.description;
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    isTicked: false,
    timestamp: new Date().toISOString(),
  };
  submissions.push(newTask);
  localStorage.setItem("submissions", JSON.stringify(submissions));
  ticktaskInput.classList.remove("active");
  showTasks(submissions);
}
function saveTasks() {
  localStorage.setItem("submissions", JSON.stringify(submissions));
}
function showTasks(submissions) {
  taskWrapper.innerHTML = ``;
  submissions.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.id = `${task.id}`;

    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = task.isTicked;
    inputCheckbox.id = "checkbox";

    inputCheckbox.addEventListener("change", () => {
      task.isTicked = inputCheckbox.checked;
      saveTasks();
      showTasks(submissions);
    });

    let taskHeader = document.createElement("div");
    taskHeader.classList.add("taskheader");
    taskHeader.innerHTML = `
    <h3>${task.title}</h3>
    <p class="description">${task.description}</p>
    `;
    let taskActions = document.createElement("div");
    taskActions.classList.add("taskActions");
    let taskEdit = document.createElement("span");
    taskEdit.classList.add("taskEdit");
    taskEdit.addEventListener("click", () => {
      editTask(task.id);
    });
    taskEdit.innerHTML = `
    <i class="fa-solid fa-pen-to-square pen"></i>
    `;
    let taskDelete = document.createElement("span");
    taskDelete.classList.add("taskDelete");
    taskDelete.addEventListener("click", () => {
      deleteTask(task.id);
      updateProgress();
    });
    taskDelete.innerHTML = `
    <i class="fa-solid fa-trash dlt"></i>
    `;
    taskActions.append(taskEdit, taskDelete);
    taskDiv.append(inputCheckbox, taskHeader, taskActions);

    taskWrapper.appendChild(taskDiv);
    updateProgress();
  });
}
function editTask(id) {
  ticktaskEdit.id = `${id}`;
  ticktaskEdit.classList.add("active");
}
function deleteTask(id) {
  const updatedSubmissions = submissions.filter((task) => task.id !== id);
  submissions = updatedSubmissions;
  saveTasks();
  showTasks(submissions);
}
function updateProgress() {
  let pendingTasks = submissions.filter((task) => task.isTicked === false);
  pendingTask.innerText = pendingTasks.length;
  let completedTasks = submissions.filter((task) => task.isTicked === true);
  completedTask.innerText = completedTasks.length;
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("activeFilter");
    });
    btn.classList.add("activeFilter");
    updateFilter(btn.dataset.filter);
  });
});
function updateFilter(filter) {
  console.log(filter);
  let pendingTasks = submissions.filter((task) => task.isTicked === false);
  let completedTasks = submissions.filter((task) => task.isTicked === true);
  if (filter === "completed") {
    showTasks(completedTasks);
  } else if (filter === "pending") {
    showTasks(pendingTasks);
  } else {
    showTasks(submissions);
  }
}
showTasks(submissions);
