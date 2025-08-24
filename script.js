const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => addTaskToDOM(task));

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if(taskText) {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        addTaskToDOM(task);
        updateLocalStorage();
        taskInput.value = "";
    }
});

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    if(task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        updateLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
        tasks = tasks.filter(t => t !== task);
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
