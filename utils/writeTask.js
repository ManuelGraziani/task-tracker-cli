import fs from "fs";
import { taskFile } from "./readTask.js";

export function writeTask(tasks) {
  fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2), "utf-8");
}
