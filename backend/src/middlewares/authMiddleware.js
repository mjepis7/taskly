const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Pega o token que vem no cabeçalho da requisição
  const token = req.header('Authorization');

  // Se não tiver token, barra o acesso
  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Faça login para continuar.' });
  }

  try {
    // Tira a palavra "Bearer " se o front-end mandar junto
    const tokenLimpo = token.replace('Bearer ', '');
    
    // Verifica se o token é válido usando o segredo do .env
    const decodificado = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
    
    // Guarda os dados do usuário na requisição para podermos usar depois
    req.usuario = decodificado;
    next(); // Deixa passar!
  } catch (erro) {
    res.status(400).json({ erro: 'Token inválido ou expirado.' });
  }
};