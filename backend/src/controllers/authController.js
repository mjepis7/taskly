const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Função para CADASTRAR novo usuário
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se o email já existe no banco
    let usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Este e-mail já está cadastrado.' });
    }

    // Criptografa a senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Cria e salva o novo usuário
    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada
    });

    await novoUsuario.save();
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

  } catch (erro) {
    res.status(500).json({ erro: 'Erro no servidor ao registrar usuário.' });
  }
};

// 2. Função para fazer LOGIN
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca o usuário pelo e-mail
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: 'E-mail ou senha incorretos.' });
    }

    // Compara a senha digitada com a criptografada no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ erro: 'E-mail ou senha incorretos.' });
    }

    // Gera o Token JWT (a credencial de acesso)
    const token = jwt.sign(
      { id: usuario._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // O token expira em 1 dia
    );

    res.json({ mensagem: 'Login realizado com sucesso!', token, nome: usuario.nome });

  } catch (erro) {
    res.status(500).json({ erro: 'Erro no servidor ao fazer login.' });
  }
};