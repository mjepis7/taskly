const express = require('express')
const router = express.Router()

const User = require('../models/User')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.usuario.id).select('-senha')

    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    return res.json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ erro: 'Erro ao buscar usuário' })
  }
})

router.put('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.usuario.id

    const { nome, cpf, dataNascimento, email } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        nome,
        cpf,
        dataNascimento,
        email
      },
      {
        new: true,
        runValidators: true
      }
    ).select('-senha')

    if (!updatedUser) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    return res.json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ erro: 'Erro ao atualizar usuário' })
  }
})

router.delete('/me', authMiddleware, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.usuario.id)

    if (!deletedUser) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    return res.json({ mensagem: 'Conta deletada com sucesso' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ erro: 'Erro ao deletar conta' })
  }
})

module.exports = router
