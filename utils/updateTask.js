import { readTask } from "./readTask.js";
import { writeTask } from "./writeTask.js";

export function updateTask(id, newDescription) {
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