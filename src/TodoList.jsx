import React, { useState } from "react";
import "./App.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Add or Update todo
  const addTodo = () => {
    if (!input.trim()) return;

    if (editId) {
      // Update existing todo
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      // Add new todo
      setTodos([...todos, { id: Date.now(), text: input }]);
    }

    setInput("");
  };

  // Delete todo
  const deletetodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit todo
  const edittodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInput(todoToEdit.text);
    setEditId(id);
  };

  return (
    <div className="todo-container">
      <div className="input-section">
        <h1 className="todo-heading animate-fadeInScale">Nirmala's TodoList</h1>

        <input
          type="text"
          placeholder="Enter what you want ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
        />

        <button onClick={addTodo} className="todo-button">
          {editId ? "Update" : "Submit"}
        </button>
      </div>

      <ul className="todolist">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <div>
              <button onClick={() => edittodo(todo.id)} className="edit-button">
                ✏️
              </button>
              <button
                onClick={() => deletetodo(todo.id)}
                className="delete-button"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
