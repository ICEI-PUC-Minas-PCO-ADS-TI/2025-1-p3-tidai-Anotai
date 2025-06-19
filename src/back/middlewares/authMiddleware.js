const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('🛡️ Verificando token...');
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('⚠️ Token não fornecido.');
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token válido. ID extraído:', decoded.id);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    console.error('❌ Token inválido ou expirado:', err.message);
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
};