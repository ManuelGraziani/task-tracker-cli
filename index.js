#!/usr/bin/env node
import fs, { writeFile } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const taskFile = path.join(__dirname, "tasks.json");

const args = process.argv.slice(2);
let id = 0;

if (!fs.existsSync(taskFile)) {
  fs.writeFileSync(taskFile, JSON.stringify([]));
}

function readTask() {
  if (fs.existsSync(taskFile)) {
    const data = fs.readFileSync(taskFile, "utf-8");
    return JSON.parse(data);
  }
  return [];
}

function writeTask(tasks) {
  fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2), "utf-8");
}

function addTask(description) {
  const tasks = readTask();
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    description: description,
    status: "todo",
  };
  tasks.push(newTask);
  writeTask(tasks);
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

function listTasks(status) {
  const tasks = readTask();
  let filteredTask = tasks;

  if (status) {
    switch (status.toLowerCase()) {
      case "todo":
        filteredTask = tasks.filter((task) => task.status === "todo");
        break;
      case "done":
        filteredTask = tasks.filter((task) => task.status === "done");
        break;
      case "in-progress":
        filteredTask = tasks.filter((task) => task.status === "in-progress");
        break;
      default:
        console.log("Invalid status");
        return;
    }
  }

  if (filteredTask.length === 0) {
    console.log("No task found");
  } else {
    console.log("ID  | Description           | Status");
    console.log("-------------------------------------");
    filteredTask.forEach((task) => {
      console.log(
        `${task.id.toString().padEnd(3, " ")} | ${task.description.padEnd(
          20,
          " "
        )} | ${task.status}`
      );
    });
  }
}

function updateTask(id, newDescription) {
  const tasks = readTask();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.description = newDescription;
    writeTask(tasks);
    console.log(`Task ID ${task.id} updated succesfully`);
  } else {
    console.log(`Task ID ${id} not found`);
  }
}

function deleteTask(id) {
  const tasks = readTask();
  const task = tasks.filter((task) => task.id !== parseInt(id));

  if (task.length < tasks.length) {
    writeTask(task);
    console.log(`Task ID ${id} deleted succesfully`);
  } else {
    console.log(`Task ID ${id} not found`);
  }
}

function markInProgress(id) {
  const tasks = readTask();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.status = "in-progress";
    writeTask(tasks);
    console.log(`Task ID ${id} marked in progress`);
  } else {
    console.log(`Task ID ${id} not found`);
  }
}

function markDone(id) {
  const tasks = readTask();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (task) {
    task.status = "done";
    writeTask(tasks);
    console.log(`Task ID ${id} marked done`);
  } else {
    console.log(`Task ID ${id} not found`);
  }
}

if (args[0] === "add") {
  const taskDescription = args.slice(1).join("");
  if (!taskDescription) {
    console.log(
      "Please provide a description\nSample: task-cli add <description>"
    );
  } else {
    addTask(taskDescription);
  }
} else if (args[0] === "list") {
  const status = args[1];
  listTasks(status);
} else if (args[0] === "update") {
  const id = args[1];
  const newDescription = args.slice(2).join(" ");
  if (!id || !newDescription) {
    console.log(
      "Please provide an id and a new description\nSample: task-cli update <id> <description>"
    );
  } else {
    updateTask(id, newDescription);
  }
} else if (args[0] === "delete") {
  const id = args[1];
  if (!id) {
    console.log("Please provide an id\nSample: task-cli delete <id>");
  } else {
    deleteTask(id);
  }
} else if (args[0] === "mark-in-progress") {
  const id = args[1];
  if (!id) {
    console.log("Please provide an id\nSample: task-cli mark-in-progress <id>");
  } else {
    markInProgress(id);
  }
} else if (args[0] === "mark-done") {
  const id = args[1];
  if (!id) {
    console.log("Please provide an id\nSample: task-cli mark-in-progress <id>");
  } else {
    markDone(id);
  }
} else {
  console.log(
    "Please provide a command. Available commands:\n" +
    "  add <description>          - Add a new task\n" +
    "  list [status]              - List tasks, optionally filtered by status (todo, done, in-progress)\n" +
    "  update <id> <description>  - Update the description of a task\n" +
    "  delete <id>                - Delete a task by ID\n" +
    "  mark-in-progress <id>      - Mark a task as in-progress\n" +
    "  mark-done <id>             - Mark a task as done"
  );
}
