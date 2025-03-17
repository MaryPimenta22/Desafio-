const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    port: parseInt(process.env.DB_PORT) || 1433,
};

async function testConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("🔥 Conexão com SQL Server bem-sucedida!");
        await pool.close();
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco:", error);
    }
}

testConnection();
