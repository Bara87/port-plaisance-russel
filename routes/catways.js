const express = require('express');
const router = express.Router();
const { getAllCatways, getCatwayById, createCatway, updateCatwayState, deleteCatway } = require('../controllers/catwayController');
const authMiddleware = require('../middleware/auth');

// Routes pour les catways



// Route protégée pour afficher la page list de catways
router.get('/list', authMiddleware, getAllCatways);

router.get('/detail/:id', authMiddleware, getCatwayById); // Route pour le detail d'un catway
router.post('/create', authMiddleware, createCatway); // Route pour créer un nouveau catway
router.post('/updateState', authMiddleware,updateCatwayState);
router.delete('/catways/delete', authMiddleware, deleteCatway);


module.exports = router;