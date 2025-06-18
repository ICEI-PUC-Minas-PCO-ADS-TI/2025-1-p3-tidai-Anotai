const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const upload = require('../middlewares/upload');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/', verificarToken, upload.single('imagem'), playlistController.criarPlaylist);
router.get('/destaques', playlistController.listarPlaylistsPublicas);
router.get('/:id', playlistController.buscarPlaylistPorId);
router.get('/:id/metas', playlistController.buscarMetasDaPlaylist);

module.exports = router;