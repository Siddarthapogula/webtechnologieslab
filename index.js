const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for todos
let todos = [];
let currentId = 1;

// Create a todo
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }
    const newTodo = { id: currentId++, task, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Read all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, completed } = req.body;
    const todo = todos.find(t => t.id === todoId);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    if (task !== undefined) {
        todo.task = task;
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== todoId);
    res.status(204).send();
});

// Start the serve
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
