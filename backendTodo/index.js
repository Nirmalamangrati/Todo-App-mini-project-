const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const usermodel = require("./usermodel"); 
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json()); // fixed

let todos = [];

// Routes
// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task || task.trim() === "") {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
