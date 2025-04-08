# Task Tracker CLI

A simple command-line task management application that helps you keep track of your tasks with basic CRUD operations and status tracking.

## Features

- Add new tasks with descriptions
- List all tasks or filter by status (todo, in-progress, done)
- Update task descriptions
- Delete tasks
- Mark tasks as in-progress or done
- Task data persists between sessions in a JSON file

## Installation

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

### Steps

1. Clone this repository or download the source code
   ```
   git clone https://github.com/ManuelGraziani/task-tracker-cli.git
   cd task-tracker-cli
   ```
2. Install dependencies
   ```
    npm install
   ```
3. Make the script executable
   ```
   chmod +x index.js
   ```
4. For global usage, you can create a symlink
   ```
   npm link
   ```

## Usage

### Adding a task

```
task-cli add "Complete the project report"
```

### Listing tasks

List all tasks:

```
task-cli list
```

List only tasks with a specific status:

```
task-cli list todo
task-cli list in-progress
task-cli list done
```

### Updating a task

```
task-cli update 1 "Complete the project report by Friday"
```

### Deleting a task

```
task-cli delete 1
```

### Changing task status

Mark a task as in-progress:

```
task-cli mark-in-progress 2
```

Mark a task as done:

```
task-cli mark-done 3
```

## Task Storage

Tasks are stored in a `tasks.json` file in the same directory as the script. The file is created automatically when you add your first task.

## Example Output

```
ID  | Description           | Status
-------------------------------------
1   | Buy groceries         | todo
2   | Finish report         | in-progress
3   | Call John             | done
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
