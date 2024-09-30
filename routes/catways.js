const express = require('express');
const router = express.Router();
const { getAllCatways, getCatwayById, createCatway, updateCatway, deleteCatway } = require('../controllers/catwayController');
const authMiddleware = require('../middleware/auth');

// Routes pour les catways


// Route protégée pour afficher la page list de catways
router.get('/list', authMiddleware, getAllCatways);

router.get('/detail/:id', authMiddleware, getCatwayById); // Route pour le detail d'un catway
router.post('/create', authMiddleware, createCatway); // Route pour créer un nouveau catway
router.put('/update/:id', authMiddleware, updateCatway); // Route pour mettre à jour un catway
router.delete('/delete/:id', authMiddleware, deleteCatway); // Route pour supprimer un catway

module.exports = router;