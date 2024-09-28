const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Fonction pour générer un token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Connexion d'un utilisateur
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Rechercher l'utilisateur par email et exclure certains champs
        const user = await User.findOne({ email }, '-__v -createdAt -updatedAt');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un JWT
        const token = generateToken(user);

        // Supprimer le mot de passe avant de retourner l'utilisateur (optionnel)
        delete user._doc.password;

        // Ajouter le token dans l'en-tête Authorization (optionnel)
        res.header('Authorization', 'Bearer ' + token);

        // Retourner l'utilisateur et le token
        res.status(200).json({ message: 'Authentification réussie', token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};