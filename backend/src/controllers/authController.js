const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registrar = async (req, res) => {
  try {
    const { nome, cpf, dataNascimento, email, senha } = req.body

    const cpfLimpo = cpf.replace(/\D/g, '')

    const usuarioExistente = await User.findOne({
      $or: [{ email }, { cpf: cpfLimpo }]
    })

    if (usuarioExistente) {
      return res.status(400).json({
        erro: 'E-mail ou CPF já cadastrado.'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const senhaCriptografada = await bcrypt.hash(senha, salt)

    const novoUsuario = new User({
      nome,
      cpf: cpfLimpo,
      dataNascimento: new Date(dataNascimento),
      email,
      senha: senhaCriptografada
    })

    await novoUsuario.save()

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!'
    })

  } catch (erro) {
    console.error('ERRO REGISTRO:', erro)

    if (erro.code === 11000) {
      return res.status(400).json({ erro: 'E-mail ou CPF já cadastrado.' })
    }

    return res.status(500).json({
      erro: 'Erro ao cadastrar usuário.'
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await User.findOne({ email })

    if (!usuario) {
      return res.status(400).json({
        erro: 'E-mail ou senha incorretos.'
      })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(400).json({
        erro: 'E-mail ou senha incorretos.'
      })
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      user: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    })

  } catch (erro) {
    return res.status(500).json({
      erro: 'Erro no servidor ao fazer login.'
    })
  }
}
