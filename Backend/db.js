const sql = require("mssql");

// Configuração do banco de dados SQL Server
const dbConfig = {
  user: "sa", // Usuário do banco de dados
  password: "NovaSenhaForte123", // Senha do banco de dados
  server: "localhost", // Nome do servidor
  database: "SEU_BANCO", // Nome do banco de dados
  options: {
    encrypt: false, // Defina como true se usar Azure
    trustServerCertificate: true,
  },
};

// Criar a conexão
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Conectado ao SQL Server!");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao banco:", err);
  });

module.exports = {
  sql,
  poolPromise,
};
