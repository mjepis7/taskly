const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas que já temos (Criar e Listar)
router.post('/', authMiddleware, taskController.criarTarefa);
router.get('/', authMiddleware, taskController.listarTarefas);

// NOVAS ROTAS (Atualizar e Deletar)
// O ":id" na URL serve para avisarmos ao back-end qual tarefa exata queremos mexer
router.put('/:id', authMiddleware, taskController.atualizarTarefa);
router.delete('/:id', authMiddleware, taskController.deletarTarefa);

module.exports = router;