const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const perfilController = require('../controllers/perfilController');

// Rota para criar perfil com upload de imagem e wallpaper
router.post(
  '/',
  verificarToken,
  upload.fields([
    { name: 'imagemPerfil', maxCount: 1 },
    { name: 'wallpaper', maxCount: 1 }
  ]),
  perfilController.criarPerfil
);

// Rota para buscar perfil por ID
router.get('/:id', perfilController.buscarPerfil);
router.get('/perfil/:id/playlists', verificarToken, perfilController.buscarPlaylistsDoUsuario);

// Exporta o router para ser usado no servidor
module.exports = router;
