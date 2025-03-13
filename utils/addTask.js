import { readTask } from "./readTask.js";
import { writeTask } from "./writeTask.js";

export function addTask(description) {
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