const { sql, poolPromise } = require("../config/db");

// Pegar todas as tarefas
const getAllTasks = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM tasks");
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

// Criar uma nova tarefa
const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .query("INSERT INTO tasks (title, description) VALUES (@title, @description)");
    res.status(201).json({ message: "Tarefa criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

// Atualizar uma tarefa
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .query("UPDATE tasks SET title = @title, description = @description WHERE id = @id");
    res.json({ message: "Tarefa atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

// Excluir uma tarefa
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request().input("id", sql.Int, id).query("DELETE FROM tasks WHERE id = @id");
    res.json({ message: "Tarefa deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
