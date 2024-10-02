const userService = require('../services/userService');

// Fonction pour se connecter
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.loginUser(email, password);  // Appel au service
        const token = userService.generateToken(user);  // Générer le token JWT
        res.cookie('token', token, { httpOnly: true });  // Stocker le token dans un cookie
        res.redirect('/users/dashboard');  // Rediriger vers le tableau de bord après connexion réussie
    } catch (error) {
        const someErrorVariable = error.message || 'Erreur lors de la connexion.';
        res.render('index', { error: someErrorVariable });  // Rendre la page index avec l'erreur
    }
};

// Fonction pour déconnecter l'utilisateur
exports.logoutUser = (req, res) => {
    res.clearCookie('token');  // Supprimer le cookie contenant le token
    res.redirect('/index');  // Rediriger vers la page de connexion
};

