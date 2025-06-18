const db = require('../config/db');

exports.criarPlaylist = async (req, res) => {
  const {
    nome_playlist,
    descricao_playlist,
    categoria_playlist,
    tag_playlist,
    prioridade,
    data_conclusao
  } = req.body;

  const imagem = req.file ? req.file.filename : null;
  const id_usuario = req.usuarioId;

  if (!nome_playlist || !prioridade || !data_conclusao) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios não preenchidos.' });
  }

  try {
    const query = `
      INSERT INTO playlist (
        id_usuario, nome_playlist, descricao_playlist,
        categoria_playlist, tag_playlist, prioridade,
        data_conclusao, url_imagem_playlist
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      id_usuario,
      nome_playlist,
      descricao_playlist || null,
      categoria_playlist || null,
      tag_playlist || null,
      prioridade,
      data_conclusao,
      imagem
    ];

    const [result] = await db.promise().query(query, valores);

    return res.status(201).json({
      mensagem: 'Playlist criada com sucesso!',
      id_playlist: result.insertId
    });
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno no servidor ao criar playlist.' });
  }
};

exports.listarPlaylistsPublicas = async (req, res) => {
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
WHERE p.visibilidade = 'publico'
ORDER BY p.id_playlist DESC
LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar playlists públicas.' });
  }
};

exports.buscarPlaylistPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        p.*, 
        pf.nome_perfil AS nome_usuario, 
        pf.url_image_perfil
      FROM playlist p
      JOIN usuario u ON p.id_usuario = u.id_usuario
      LEFT JOIN perfil pf ON pf.id_perfil = u.id_usuario
      WHERE p.id_playlist = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Playlist não encontrada.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar playlist por ID:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

exports.buscarMetasDaPlaylist = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.promise().query(`
      SELECT id_metas, nome_meta, descricao_meta, url_imagem_meta
      FROM metas
      WHERE id_playlist = ?
    `, [id]);

    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar metas:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar metas da playlist.' });
  }
};