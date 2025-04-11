const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');
const app = express();

app.use(cors());
app.use(express.json());

const SECRET = 'secreto123'; // Em produção, use variável de ambiente!

// Rota de cadastro (/signup)
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos!' });
  }

  const hash = bcrypt.hashSync(password, 8);

  db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, hash], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(400).json({ message: 'Erro ao cadastrar usuário.' });
    }

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: this.lastID });
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor.' });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
});