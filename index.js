#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const taskFile = path.join(__dirname, "tasks.json")

const args = process.argv.slice(2)

if(!fs.existsSync(taskFile)){
    fs.writeFileSync(taskFile, JSON.stringify([]))
}

function readTask() {
    if(fs.existsSync(taskFile)) {
        const data = fs.readFileSync(taskFile, "utf-8")
        return JSON.parse(data)
    } 
    return []
}

function addTask(description) {
    const tasks = readTask()
    const newTask = {
        id: 1,
        description: description,
        status: "todo",
    }
    tasks.push(newTask)
    fs.writeFileSync(taskFile, JSON.stringify(tasks), "utf-8")
}

if(args[0] === "add"){
    const taskDescription = args.slice(1).join("")
    if(!taskDescription){
        console.log("Please provide a description");
        console.log("Sample: task-cli add <description>");
    } else {
        addTask(taskDescription)
    }
} 
