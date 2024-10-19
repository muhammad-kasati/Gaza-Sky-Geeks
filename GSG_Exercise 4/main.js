let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const description = prompt("Enter the task description:");
  if (description === null) return;
  const newTask = { id: tasks.length + 1, description, completed: false };
  tasks.push(newTask);
  saveTasks();
  console.log("===========================");
  console.log("Task added!");
  console.log("===========================");
};

const viewTasks = () => {
  if (tasks.length === 0) {
    console.log("===========================");
    console.log("No tasks available.");
    console.log("===========================");
  } else {
    console.log("===========================");
    console.log("Tasks:-");
    tasks.forEach((task) => {
      console.log(
        `${task.id}. ${task.description} - ${
          task.completed ? "Completed" : "Incomplete"
        }`
      );
    });
    console.log("===========================");
  }
};

const toggleTaskStatus = () => {
  const id = parseInt(prompt("Enter task ID to toggle status:"), 10);
  if (isNaN(id)) return;
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    console.log("===========================");
    console.log("Task status updated.");
    console.log("===========================");
  } else {
    console.log("===========================");
    console.log("Task not found.");
    console.log("===========================");
  }
};

const removeTask = () => {
  const id = parseInt(prompt("Enter task ID to remove:"), 10);
  if (isNaN(id)) return;
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    tasks.forEach((task, idx) => (task.id = idx + 1));
    saveTasks();
    console.log("===========================");
    console.log("Task removed.");
    console.log("===========================");
  } else {
    console.log("===========================");
    console.log("Task not found.");
    console.log("===========================");
  }
};

const updateTask = () => {
  const id = parseInt(prompt("Enter task ID to update:"), 10);
  if (isNaN(id)) return;
  const task = tasks.find((t) => t.id === id);
  if (task) {
    const newDescription = prompt("Enter new task description:");
    if (newDescription === null) return;
    task.description = newDescription;
    saveTasks();
    console.log("===========================");
    console.log("Task description updated.");
    console.log("===========================");
  } else {
    console.log("===========================");
    console.log("Task not found.");
    console.log("===========================");
  }
};

const searchTasks = () => {
  const keyword = prompt("Enter keyword to search tasks:");
  if (keyword === null) return;
  const filteredTasks = tasks.filter((t) =>
    t.description.toLowerCase().includes(keyword.toLowerCase())
  );
  if (filteredTasks.length > 0) {
    console.log("===========================");
    filteredTasks.forEach((task) => {
      console.log(
        `${task.id}. ${task.description} - ${
          task.completed ? "Completed" : "Incomplete"
        }`
      );
    });
    console.log("===========================");
  } else {
    console.log("===========================");
    console.log("No tasks found with that keyword.");
    console.log("===========================");
  }
};

const menu = () => {
  console.log("===========================");
  console.log("Task Manager");
  console.log("1. Add Task");
  console.log("2. View Tasks");
  console.log("3. Toggle Task Status");
  console.log("4. Remove Task");
  console.log("5. Update Task");
  console.log("6. Search Tasks");
  console.log("7. Exit");

  const choice = prompt("Choose an option:");
  if (choice === null || choice === "7") {
    console.log("Goodbye!");
    return false;
  }

  switch (choice) {
    case "1":
      addTask();
      break;
    case "2":
      viewTasks();
      break;
    case "3":
      toggleTaskStatus();
      break;
    case "4":
      removeTask();
      break;
    case "5":
      updateTask();
      break;
    case "6":
      searchTasks();
      break;
    default:
      console.log("Invalid option. Please choose again.");
  }

  return true;
};

const startTaskManager = () => {
  let running = true;
  while (running) {
    running = menu();
  }
};

document.addEventListener("click", () => {
  startTaskManager();
});
