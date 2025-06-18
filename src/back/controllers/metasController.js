const db = require('../config/db');
const path = require('path');

const criarMeta = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  const { id_playlist, nome_meta, descricao_meta, prioridade_meta } = req.body;
  const url_imagem_meta = req.files && req.files.imagem_meta
    ? `/uploads/${req.files.imagem_meta[0].filename}`
    : null;

  const sqlMeta = `
    INSERT INTO metas (id_playlist, nome_meta, descricao_meta, url_imagem_meta, prioridade_meta, concluida)
    VALUES (?, ?, ?, ?, ?, 0)
  `;

  db.query(sqlMeta, [id_playlist, nome_meta, descricao_meta, url_imagem_meta, prioridade_meta], (err, result) => {
    if (err) {
      console.error("Erro ao inserir meta:", err);
      return res.status(500).json({ erro: 'Erro ao criar meta', detalhes: err });
    }

    const id_meta = result.insertId;

    if (!req.files || !req.files.arquivos) {
      return res.status(201).json({ mensagem: 'Meta criada com sucesso sem arquivos.' });
    }

    const arquivos = Array.isArray(req.files.arquivos) ? req.files.arquivos : [req.files.arquivos];
    const arquivosData = arquivos.map((arquivo) => [
      id_meta,
      arquivo.originalname,
      req.body[`descricao_${arquivo.originalname}`] || '',
      `/uploads/${arquivo.filename}`,
    ]);

    const sqlArquivos = `
      INSERT INTO arquivos_meta (id_meta, nome_arquivo, descricao_arquivo, url_arquivo)
      VALUES ?
    `;

    db.query(sqlArquivos, [arquivosData], (err2) => {
      if (err2) return res.status(500).json({ erro: 'Meta criada, mas erro ao salvar arquivos.', detalhes: err2 });
      res.status(201).json({ mensagem: 'Meta e arquivos criados com sucesso!' });
    });
  });
};

const buscarMetaPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        m.*, 
        pf.nome_perfil AS nome_usuario, 
        pf.url_image_perfil
      FROM metas m
      JOIN playlist p ON m.id_playlist = p.id_playlist
      JOIN usuario u ON p.id_usuario = u.id_usuario
      LEFT JOIN perfil pf ON pf.id_perfil = u.id_usuario
      WHERE m.id_metas = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Meta não encontrada.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar meta por ID:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

module.exports = { criarMeta, buscarMetaPorId };