
const db = require('../config/db');

// Função para criar ou atualizar perfil
exports.criarPerfil = async (req, res) => {

  const {
    primeiroNome,
    segundoNome,
    nome_perfil, // <- novo campo
    descricao,
    sobreMim,
    instagram,
    linkedin,
    github
  } = req.body;

  const id_usuario = req.usuarioId;

  console.log('🔍 Requisição recebida para criação/edição de perfil');
  console.log('Token decodificado - ID do usuário:', id_usuario);
  console.log('Dados recebidos no corpo da requisição:', req.body);
  if (!id_usuario || !primeiroNome || !segundoNome || !nome_perfil || !descricao || !sobreMim) {
  console.warn('⚠️ Campos obrigatórios não preenchidos.');
  return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos.' });
}
  const imagemPerfil = req.files?.imagemPerfil?.[0]?.filename || null;
  const wallpaper = req.files?.wallpaper?.[0]?.filename || null;

  try {
    // Verifica se o perfil já existe
    const [rows] = await db.promise().query(
      'SELECT * FROM perfil WHERE id_perfil = ?',
      [id_usuario]
    );

    if (rows.length > 0) {
      // Atualiza perfil existente
      const query = `
  UPDATE perfil SET
    nome_perfil = ?, nome = ?, sobrenome = ?, descricao = ?, sobre_mim = ?,
    url_image_perfil = ?, url_wallpaper = ?,
    url_instagram = ?, url_linkedin = ?, url_github = ?
  WHERE id_perfil = ?
`;
      const valores = [
        nome_perfil,
        primeiroNome,
        segundoNome,
        descricao,
        sobreMim,
        imagemPerfil,
        wallpaper,
        instagram || null,
        linkedin || null,
        github || null,
        id_usuario
      ];

      await db.promise().query(query, valores);
      console.log('✅ Perfil atualizado com sucesso.');
      return res.status(200).json({ mensagem: 'Perfil atualizado com sucesso!' });
    } else {
      // Cria novo perfil
      const query = `
  INSERT INTO perfil (
    id_perfil, nome_perfil, nome, sobrenome, descricao, sobre_mim,
    url_image_perfil, url_wallpaper,
    url_instagram, url_linkedin, url_github
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
      const valores = [
        id_usuario,
        nome_perfil,
        primeiroNome,
        segundoNome,
        descricao,
        sobreMim,
        imagemPerfil,
        wallpaper,
        instagram || null,
        linkedin || null,
        github || null
      ];

      await db.promise().query(query, valores);
      console.log('✅ Perfil criado com sucesso.');
      return res.status(201).json({ mensagem: 'Perfil criado com sucesso!' });
    }
  } catch (err) {
    console.error('❌ Erro ao criar/atualizar perfil:', err);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

// Função para buscar perfil
exports.buscarPerfil = async (req, res) => {
  const id_usuario = req.params.id;

  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM perfil WHERE id_perfil = ?',
      [id_usuario]
    );

    if (rows.length > 0) {
      return res.status(200).json(rows[0]);
    } else {
      return res.status(404).json({ mensagem: 'Perfil não encontrado.' });
    }
  } catch (err) {
    console.error('❌ Erro ao buscar perfil:', err);
    return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

exports.buscarPlaylistsDoUsuario = async (req, res) => {
  const id_usuario = req.params.id;
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        p.id_playlist, p.nome_playlist, p.descricao_playlist, 
        p.categoria_playlist, p.prioridade, p.url_imagem_playlist,
        pf.nome_perfil AS nome_usuario,
        pf.url_image_perfil
      FROM playlist p
      JOIN usuario u ON p.id_usuario = u.id_usuario
      LEFT JOIN perfil pf ON pf.id_perfil = u.id_usuario
      WHERE p.id_usuario = ?
      ORDER BY p.id_playlist DESC
    `, [id_usuario]);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao buscar playlists do usuário:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};