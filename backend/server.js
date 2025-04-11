const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) return console.error(err.message);
  console.log('🗄️ Conectado ao banco SQLite!');
});

// Middleware
app.use(cors());
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});