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

// Route de connexion dans userRoutes.js
router.post('/login', userController.loginUser);

// Route vers le tableau de bord (nécessite authentification)
router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard', { user: req.user }); // Rendre la vue du tableau de bord avec les informations de l'utilisateur
});

router.get('/logout', authMiddleware, userController.logoutUser);  // Protège la route si nécessaire



module.exports = router;