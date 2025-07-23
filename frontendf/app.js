const API_URL = 'http://localhost:4000/todos';

const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

function fetchTodos() {
    fetch(API_URL)
        .then(res => res.json())
        .then(todos => {
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
                    <div>
                        <button onclick="toggleTodo(${todo.id}, ${!todo.completed})">${todo.completed ? 'Undo' : 'Complete'}</button>
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                    </div>
                `;
                todoList.appendChild(li);
            });
        });
}

window.toggleTodo = function (id, completed) {
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    }).then(fetchTodos);
}

window.deleteTodo = function (id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(fetchTodos);
}

todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    }).then(() => {
        todoInput.value = '';
        fetchTodos();
    });
});

fetchTodos();
