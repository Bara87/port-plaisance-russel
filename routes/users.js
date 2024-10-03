// routes/userRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Importer le middleware

// Créer un utilisateur (accessible à tous, pas besoin d'authentification)
router.post('/create', userController.createUser);

// Modifier un utilisateur (nécessite authentification)
router.post('/update/:id', authMiddleware, userController.updateUser);

// Supprimer un utilisateur (nécessite authentification)
router.post('/delete/:id', authMiddleware, userController.deleteUser);

// Route de connexion dans userRoutes.js
router.post('/login', userController.loginUser);

router.get('/index', (req, res) => {
    // Pas besoin de logique pour récupérer des utilisateurs ou gérer des erreurs
    res.render('index', { error: null }); // Passer une valeur nulle pour 'error'
});


// Route vers le tableau de bord (nécessite authentification)
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user }); // Rendre la vue du tableau de bord avec les informations de l'utilisateur
});

router.get('/logout', authMiddleware, userController.logoutUser);  // Protège la route si nécessaire



module.exports = router;