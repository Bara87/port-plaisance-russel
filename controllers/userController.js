const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Fonction pour générer un token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
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

// Créer un utilisateur
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password }); // Le mot de passe sera haché automatiquement
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur.', error });
    }
};

// Modifier un utilisateur
const updateUser = async (req, res) => {
    const { userId, newName, newEmail, newPassword } = req.body;

    try {
        const updateData = { name: newName, email: newEmail };
        if (newPassword) {
            updateData.password = newPassword; // Le mot de passe sera haché automatiquement lors de la sauvegarde
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur modifié avec succès.', updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la modification de l’utilisateur.', error });
    }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la suppression de l’utilisateur.', error });
    }
};

// Exporter les fonctions
module.exports = {
    generateToken,
    loginUser,
    createUser,
    updateUser,
    deleteUser,
};
