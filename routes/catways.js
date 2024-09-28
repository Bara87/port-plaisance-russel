const express = require('express');
const router = express.Router();
const { getAllCatways, getCatwayById, createCatway, updateCatway, deleteCatway } = require('../controllers/catwayController');
const authMiddleware = require('../middleware/auth');

// Routes pour les catways
router.get('/', authMiddleware, getAllCatways);
router.get('/:id', authMiddleware, getCatwayById);
router.post('/', authMiddleware, createCatway);
router.put('/:id', authMiddleware, updateCatway);
router.delete('/:id', authMiddleware, deleteCatway);

module.exports = router;