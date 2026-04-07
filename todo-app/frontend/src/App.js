import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    const res = await fetch("https://todo-app-mern-otg1.onrender.com/tasks");
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return;

    await fetch("https://todo-app-mern-otg1.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`https://todo-app-mern-otg1.onrender.com/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  // Mark complete
  const updateTask = async (id) => {
    await fetch(`https://todo-app-mern-otg1.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "completed" }),
    });
    fetchTasks();
  };

  // Edit task
  const editTask = async (id) => {
    const newTitle = prompt("Enter new task:");
    if (!newTitle) return;

    await fetch(`https://todo-app-mern-otg1.onrender.com/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });

    fetchTasks();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#333" }}>Task Manager App 🚀</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      {loading && <p>Loading...</p>}

      <ul style={{ padding: 0 }}>
        {tasks.length === 0 ? (
          <p>No tasks yet 😴</p>
        ) : (
          tasks.map((task) => (
            <li
              key={task._id}
              style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                listStyle: "none",
              }}
            >
              <span
                style={{
                  textDecoration:
                    task.status === "completed"
                      ? "line-through"
                      : "none",
                }}
              >
                {task.title} - {task.status}
              </span>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => editTask(task._id)}
              >
                ✏️
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTask(task._id)}
              >
                ❌
              </button>

              <button
                style={{ marginLeft: "5px" }}
                onClick={() => updateTask(task._id)}
              >
                ✔
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;