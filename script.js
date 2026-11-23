// variables
const inputForm = document.querySelector(".input-form");
const openInput = document.getElementById("openInput");
const ticktaskInput = document.getElementById("ticktaskInput");
const closeBtn = document.querySelector(".closeBtn");


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
    title,
    description,
    timestamp: new Date().toISOString(),
  };
  let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
  submissions.push(newTask);
  localStorage.setItem("submissions", JSON.stringify(submissions));
  console.log(title, description);
}
let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

console.log(submissions);
