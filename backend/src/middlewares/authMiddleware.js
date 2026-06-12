const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization')

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Acesso negado. Faça login para continuar.'
    })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({
      erro: 'Formato do token inválido.'
    })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({
      erro: 'Esquema de autenticação inválido.'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.usuario = {
      id: decoded.id || decoded._id,
      email: decoded.email
    }

    return next()
  } catch (error) {
    return res.status(401).json({
      erro: 'Token inválido ou expirado.'
    })
  }
}
