const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); 

// Route pour la page d'accueil
router.get('/', (req, res) => {
    res.render('index'); // Assurez-vous que votre fichier index.ejs est dans le dossier views
});

/**
 * @swagger
 * /users/dashboard:
 *   get:
 *     summary: Afficher le tableau de bord de l'utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tableau de bord affiché
 *       401:
 *         description: Non autorisé
 */
router.get('/dashboard' , authMiddleware, (req, res) => {
    res.render('dashboard', { user: req.user }); // Rendre la vue du tableau de bord avec les informations de l'utilisateur
});

module.exports = router;