const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de teste inicial
app.get('/', (req, res) => {
  res.json({ mensagem: "Backend do Taskly rodando com sucesso! 🚀" });
});

// ROTAS DE AUTENTICAÇÃO (Cadastro e Login)
app.use('/api/auth', require('./routes/authRoutes'));

// ROTAS DE TAREFAS (Protegidas)
app.use('/api/tasks', require('./routes/taskRoutes'));

// Pegando a porta do .env ou usando a 3000 por padrão
const PORT = process.env.PORT || 3000;

// Conectando ao MongoDB e DEPOIS ligando o servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((erro) => {
    console.error('❌ Erro ao conectar no MongoDB:', erro);
  });