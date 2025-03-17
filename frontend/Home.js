import React from "react";
import { useState, useEffect } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Erro ao buscar tarefas:", err));
  }, []);

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} - {task.completed ? "✅" : "❌"}</li>
        ))}
      </ul>
    </div>
  );
}


export default Home;
