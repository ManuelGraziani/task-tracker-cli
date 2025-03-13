import { readTask } from "./readTask.js";
import { writeTask } from "./writeTask.js";

export function deleteTask(id) {
    const tasks = readTask();
    const task = tasks.filter((task) => task.id !== parseInt(id));
  
    if (task.length < tasks.length) {
      writeTask(task);
      console.log(`Task ID ${id} deleted succesfully`);
    } else {
      console.log(`Task ID ${id} not found`);
    }
  }
  