const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    console.log(`Adding todo: ${title}`);
    
    const todo = { id: Date.now(), title, completed: false };
    todos.push(todo);
    res.status(201).json(todo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = todos.find(t => t.id == id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    res.json(todo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id == id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(204).send();
});

app.listen(4000, () => {
    console.log('Todo app running on port 4000');
});
