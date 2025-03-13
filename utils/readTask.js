import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const taskFile = path.join(__dirname, "../tasks.json");

export function readTask() {
  if (fs.existsSync(taskFile)) {
    const data = fs.readFileSync(taskFile, "utf-8");
    return JSON.parse(data);
  }
  return [];
}
