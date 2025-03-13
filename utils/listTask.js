import { readTask } from "./readTask.js";

export function listTasks(status) {
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