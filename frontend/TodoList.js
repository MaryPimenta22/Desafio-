import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaCheck, FaArchive } from "react-icons/fa";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Buscar tarefas no backend
  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Erro ao buscar tarefas:", error));
  }, []);

  // Criar nova tarefa
  const addTask = () => {
    if (!newTask.trim()) return;

    axios.post("http://localhost:5000/tasks", { title: newTask })
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error("Erro ao adicionar tarefa:", error));

    setNewTask("");
  };

  // Marcar como concluída
  const completeTask = (id) => {
    axios.put(`http://localhost:5000/tasks/${id}/complete`)
      .then(() => setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )))
      .catch((error) => console.error("Erro ao completar tarefa:", error));
  };

  // Deletar tarefa
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch((error) => console.error("Erro ao excluir tarefa:", error));
  };

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <div className="task-input">
        <input 
          type="text" 
          placeholder="Nova tarefa..." 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button onClick={addTask}>
          <FaPlus /> Adicionar
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span>{task.title}</span>
            <div>
              <button onClick={() => completeTask(task.id)}>
                <FaCheck />
              </button>
              <button onClick={() => deleteTask(task.id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
