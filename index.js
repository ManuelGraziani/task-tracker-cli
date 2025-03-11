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


