#!/usr/bin/env node
import fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { addTask } from "./utils/addTask.js";
import { listTasks } from "./utils/listTask.js";
import { updateTask } from "./utils/updateTask.js";
import { deleteTask } from "./utils/deleteTask.js";
import { markTask } from "./utils/markTask.js";
import { taskFile } from "./utils/readTask.js";
import { argv } from "process";

const args = process.argv.slice(2);

if (!fs.existsSync(taskFile)) {
  fs.writeFileSync(taskFile, JSON.stringify([]));
}

yargs(hideBin(process.argv))
  .command(
    "add <description>",
    "Add a new task",
    (yargs) => {
      yargs.positional("description", {
        describe: "Description of the task",
        type: "string",
      });
    },
    (argv) => {
      addTask(argv.description);
    }
  )
  .command(
    "list [status]",
    "List tasks, optionally filtered by status",
    (yargs) => {
      yargs.positional("status", {
        describe: "Status of the tasks to list (todo, done, in-progress)",
        type: "string",
      });
    },
    (argv) => {
      listTasks(argv.status);
    }
  )
  .command(
    "update <id> <description>",
    "Update the description of a task",
    (yargs) => {
      yargs
        .positional("id", {
          describe: "ID of the task to update",
          type: "string",
        })
        .positional("description", {
          describe: "New description of the task",
          type: "string",
        });
    },
    (argv) => {
      updateTask(argv.id, argv.description);
    }
  )
  .command(
    "delete <id>",
    "Delete a task",
    (yargs) => {
      yargs.positional("id", {
        describe: "ID of the task to delete",
        type: "string",
      });
    },
    (argv) => {
      deleteTask(argv.id);
    }
  )
  .command(
    "mark-in-progress <id>",
    "Mark a task as in-progress",
    (yargs) => {
      yargs.positional("id", {
        describe: "ID of the task to mark as in-progress",
        type: "string",
      });
    },
    (argv) => {
      markTask(argv.id, "in-progress");
    }
  )
  .command(
    "mark-done <id>",
    "Mark a task as done",
    (yargs) => {
      yargs.positional("id", {
        describe: "ID of the task to mark as done",
        type: "string",
      });
    },
    (argv) => {
      markTask(argv.id, "done");
    }
  )
  .demandCommand(1, "Please provide a valid command.")
  .help().argv;
