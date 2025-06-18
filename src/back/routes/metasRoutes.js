const express = require('express');
const router = express.Router();
const { criarMeta, buscarMetaPorId } = require('../controllers/metasController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'imagem_meta', maxCount: 1 },
    { name: 'arquivos', maxCount: 10 }
  ]),
  criarMeta
);

router.get('/:id', buscarMetaPorId); // ✅ nova rota

module.exports = router;