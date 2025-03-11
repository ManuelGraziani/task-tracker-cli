#!/usr/bin/env node
import fs from "fs";
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

function addTask(description) {
  const tasks = readTask();
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    description: description,
    status: "todo",
  };
  tasks.push(newTask);
  fs.writeFileSync(taskFile, JSON.stringify(tasks), "utf-8");
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
        `${task.id.toString().padEnd(3, ' ')} | ${task.description.padEnd(20, ' ')} | ${task.status}`
      );
    });
  }
}

if (args[0] === "add") {
  const taskDescription = args.slice(1).join("");
  if (!taskDescription) {
    console.log("Please provide a description");
    console.log("Sample: task-cli add <description>");
  } else {
    addTask(taskDescription);
  }
} else if (args[0] === "list") {
  const status = args[1];
  listTasks(status);
}
