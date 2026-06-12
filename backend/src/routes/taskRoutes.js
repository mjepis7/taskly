const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const authMiddleware = require('../middlewares/authMiddleware')

//Rotas de tarefas (todas protegidas por autenticação)

// Criar e listar tarefas
router.post('/', authMiddleware, taskController.criarTarefa)
router.get('/', authMiddleware, taskController.listarTarefas)

// Atualizar e deletar tarefa específica
router.put('/:id', authMiddleware, taskController.atualizarTarefa)
router.delete('/:id', authMiddleware, taskController.deletarTarefa)

module.exports = router
