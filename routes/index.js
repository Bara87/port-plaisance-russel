const express = require('express');
const router = express.Router();

// Route pour la page d'accueil
router.get('/', (req, res) => {
    res.render('index'); // Assurez-vous que votre fichier index.ejs est dans le dossier views
});

module.exports = router;