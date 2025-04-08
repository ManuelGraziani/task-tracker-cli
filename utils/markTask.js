import { readTask } from "./readTask.js";
import { writeTask } from "./writeTask.js";

export function markTask(id, status) {
    const tasks = readTask();
    const task = tasks.find((task) => task.id === parseInt(id));
  
    if(task) {
      switch(status) {
        case "in-progress":
          task.status = "in-progress";
          console.log(`Task ID ${id} marked in progress`);
          break;
        case "done":
          task.status = "done";
          console.log(`Task ID ${id} marked done`);
          break;
        case "todo":
          task.status = "todo";
          console.log(`Task ID ${id} marked todo`);
          break;
        default:
          console.log("Invalid status");
          return;
      }
      writeTask(tasks);
    } else {
      console.log(`Task ID ${id} not found`);
    }
  }