const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Carrega as variáveis do .env
require("./config/db"); // Importa a conexão com o banco

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir JSON e CORS
app.use(express.json());
app.use(cors());

// Importando as rotas de tarefas
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 API TODO List rodando!");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
