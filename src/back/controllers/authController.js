const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Função auxiliar para validar entrada
const validarEntrada = (email, senha) => {
  return email && senha && typeof email === 'string' && typeof senha === 'string';
};

exports.registrar = async (req, res) => {
  const { email, senha } = req.body;

  if (!validarEntrada(email, senha)) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT id_usuario FROM usuario WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ mensagem: 'Credenciais inválidas.' }); // Mensagem genérica
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await db.promise().query('INSERT INTO usuario (email, senha_hash) VALUES (?, ?)', [email, senhaHash]);

    console.log('✅ Usuário registrado com sucesso!');
    return res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!validarEntrada(email, senha)) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT id_usuario, senha_hash FROM usuario WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não está definido!');
      return res.status(500).json({ mensagem: 'Erro de configuração do servidor.' });
    }

    const token = jwt.sign({ id: usuario.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      mensagem: 'Login bem-sucedido!',
      token,
      usuario: { id: usuario.id_usuario, email }
    });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};