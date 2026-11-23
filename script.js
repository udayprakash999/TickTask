// variables
const inputForm = document.querySelector(".input-form");
const openInput = document.getElementById("openInput");
const ticktaskInput = document.getElementById("ticktaskInput");
const closeBtn = document.querySelector(".closeBtn");
const taskWrapper = document.querySelector(".task-wrapper");
const pendingTask = document.getElementById('pendingTask')

let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

openInput.addEventListener("click", () => {
  ticktaskInput.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  ticktaskInput.classList.remove("active");
});
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(inputForm);
  let formEntries = Object.fromEntries(formData.entries());
  submitForm(formEntries);
  inputForm.reset();
});
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
  console.log(title, description);
  ticktaskInput.classList.remove("active");
  showTasks();
}
function saveTasks() {
  localStorage.setItem("submissions", JSON.stringify(submissions));
}
function showTasks() {
  taskWrapper.innerHTML = ``;
  submissions.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = task.isTicked;
    inputCheckbox.id = "checkbox";

    inputCheckbox.addEventListener("change", () => {
      task.isTicked = inputCheckbox.checked;
      saveTasks();
      showTasks();
    });

    let taskHeader = document.createElement("div");
    taskHeader.classList.add("taskheader");
    taskHeader.innerHTML = `
    <h3>${task.title}</h3>
    <p class="description">${task.description}</p>
    `;
    let taskEdit = document.createElement("div");
    taskEdit.classList.add("edit");
    taskEdit.innerHTML = `
    <i class="fa-solid fa-pen-to-square pen"></i>
    <i class="fa-solid fa-trash dlt"></i>
    `;
    taskDiv.append(inputCheckbox, taskHeader, taskEdit);

    taskWrapper.appendChild(taskDiv);
    console.log(task.title);
  });
}
showTasks();

