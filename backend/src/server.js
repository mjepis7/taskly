const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Rota teste
app.get('/', (req, res) => {
  res.json({ mensagem: "Backend do Taskly rodando com sucesso!" });
});

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

// Erro global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((erro) => {
    console.error('Erro ao conectar no MongoDB:', erro);
  });
