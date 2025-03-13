#!/usr/bin/env node
import fs from "fs";
import { addTask } from "./utils/addTask.js";
import { listTasks } from "./utils/listTask.js";
import { updateTask } from "./utils/updateTask.js";
import { deleteTask } from "./utils/deleteTask.js";
import { markTask } from "./utils/markTask.js";
import { taskFile } from "./utils/readTask.js";

const args = process.argv.slice(2);

if (!fs.existsSync(taskFile)) {
  fs.writeFileSync(taskFile, JSON.stringify([]));
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
    markTask(id, "in-progress");
  }
} else if (args[0] === "mark-done") {
  const id = args[1];
  if (!id) {
    console.log("Please provide an id\nSample: task-cli mark-in-progress <id>");
  } else {
    markTask(id, "done");
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
