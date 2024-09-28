// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importer le contrôleur
const authMiddleware = require('../middleware/authMiddleware'); // Importer le middleware

// Créer un utilisateur (accessible à tous, pas besoin d'authentification)
router.post('/users/create', userController.createUser);

// Modifier un utilisateur (nécessite authentification)
router.post('/users/update', authMiddleware, userController.updateUser);

// Supprimer un utilisateur (nécessite authentification)
router.post('/users/delete', authMiddleware, userController.deleteUser);

module.exports = router;