const express = require('express');
const router = express.Router();
const { getAllCatways, getCatwayById, createCatway, updateCatway, deleteCatway } = require('../controllers/catwayController');
const authMiddleware = require('../middleware/auth');

// Routes pour les catways
router.get('/', authMiddleware, getAllCatways); // Route pour la liste des catways
router.get('/:id', authMiddleware, getCatwayById); // Route pour le detail d'un catway
router.post('/', authMiddleware, createCatway); // Route pour créer un nouveau catway
router.put('/:id', authMiddleware, updateCatway); // Route pour mettre à jour un catway
router.delete('/:id', authMiddleware, deleteCatway); // Route pour supprimer un catway

module.exports = router;