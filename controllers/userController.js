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

// Créer un utilisateur
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await userService.createUser({ name, email, password });  // Appel au service
        res.status(201).json({ message: 'Utilisateur créé avec succès.', newUser });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur.', error });
    }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
    const { userId, newName, newEmail, newPassword } = req.body;
    try {
        const updatedUser = await userService.updateUser(userId, { name: newName, email: newEmail, password: newPassword });  // Appel au service
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur modifié avec succès.', updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la modification de l’utilisateur.', error });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const deletedUser = await userService.deleteUser(userId);  // Appel au service
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la suppression de l’utilisateur.', error });
    }
};