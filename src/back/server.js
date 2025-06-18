const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const metasRoutes = require('./routes/metasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Servir arquivos estáticos da pasta front
app.use(express.static(path.join(__dirname, '..', 'front')));

// ✅ Servir imagens da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front', 'tela-inicial.html'));
});

// Rotas
app.use('/perfil', perfilRoutes);
app.use('/playlists', playlistRoutes);
app.use('/metas', metasRoutes);
app.use('/', authRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});