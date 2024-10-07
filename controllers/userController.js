const userService = require('../services/userService');

/**
 * Fonction pour se connecter un utilisateur.
 * @param {Object} req - La requête HTTP contenant les informations de connexion.
 * @param {Object} res - La réponse HTTP pour renvoyer des données au client.
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.loginUser(email, password); // Appel au service
        const token = userService.generateToken(user); // Générer le token JWT
        res.cookie('token', token, { httpOnly: true }); // Stocker le token dans un cookie
        res.redirect('/dashboard'); // Rediriger vers le tableau de bord après connexion réussie
    } catch (error) {
        console.log('Error during login:', error); // Log d'erreur
        const someErrorVariable = error.message || 'Erreur lors de la connexion.';
        res.render('index', { error: someErrorVariable }); // Rendre la page index avec l'erreur
    }
};


/**
 * Fonction pour créer un utilisateur.
 * @param {Object} req - La requête HTTP contenant les données de l'utilisateur.
 * @param {Object} res - La réponse HTTP pour renvoyer des données au client.
 */
exports.createUser = async (req, res) => {
    try {
        const userData = req.body; // Les données envoyées par le formulaire
        const newUser = await userService.createUser(userData); // Appel au service pour créer un utilisateur
        res.status(201).json(newUser); // Réponse avec l'utilisateur créé
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * Fonction pour modifier un utilisateur.
 * @param {Object} req - La requête HTTP contenant l'ID de l'utilisateur et les données de mise à jour.
 * @param {Object} res - La réponse HTTP pour renvoyer des données au client.
 */
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id; // ID de l'utilisateur à mettre à jour
        const updateData = req.body;  // Les données de mise à jour envoyées par le formulaire
        const updatedUser = await userService.updateUser(userId, updateData); // Appel au service pour mettre à jour
        res.status(200).json(updatedUser); // Réponse avec l'utilisateur mis à jour
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * Fonction pour supprimer un utilisateur.
 * @param {Object} req - La requête HTTP contenant l'ID de l'utilisateur à supprimer.
 * @param {Object} res - La réponse HTTP pour renvoyer des données au client.
 */
exports.deleteUser = async (req, res) => {
    const userId = req.params.id; // Assurez-vous que c'est la bonne clé pour obtenir l'ID

    if (!userId.match) { // Vérifiez si l'ID est un ObjectId valide
        return res.status(400).json({ message: 'ID utilisateur invalide.' });
    }

    try {
        const deletedUser = await userService.deleteUserById(userId); // Appeler le service pour supprimer l'utilisateur

        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
};


/**
 * Fonction pour déconnecter un utilisateur.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP pour renvoyer des données au client.
 */
exports.logoutUser = (req, res) => {
    res.clearCookie('token');  // Supprimer le cookie contenant le token
    res.redirect('/');  // Rediriger vers la page de connexion
};

