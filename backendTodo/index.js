import express from "express"; // use ES6 import style
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 800;

app.use(cors());
app.use(bodyParser.json());

let todos = [];

//Routes
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
