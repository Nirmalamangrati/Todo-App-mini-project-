import { useEffect, useState } from "react";
import "./App.css";
const Todos = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  //Fetch from backend
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await fetch("http://localhost:8000/todos");
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      }
    };
    getTodos();
  }, []);

  // Add or update todo
  const handleAddTodo = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      // Update existing todo
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = input;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      // Add new todo
      setTodos([...todos, input]);
    }

    setInput("");
  };

  // Edit todo
  const handleEdit = (index: number) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  // Delete todo
  const handleDelete = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="bg-gray-300 h-screen flex flex-col items-center p-4">
      <h1 className="mt-4 text-4xl font-bold shadow  animate-spin ">
        Todo App
      </h1>

      {/* Input Box */}
      <div className="mt-10 w-full max-w-md flex gap-4">
        <input
          type="text"
          className="border border-gray-400 rounded h-10 w-full px-4"
          placeholder="Enter todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-green-500 text-white rounded h-10 w-32 hover:bg-green-900"
          onClick={handleAddTodo}
        >
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </div>

      {/* Todos List */}
      <div className="mt-8 w-full max-w-md">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="bg-white p-3 mb-2 rounded shadow flex justify-between items-center"
          >
            <span>{todo}</span>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
