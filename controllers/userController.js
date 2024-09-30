const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Fonction pour générer un token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Fonction pour se connecter
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Récupérer les informations du formulaire
    let someErrorVariable = null;

    try {
        const user = await User.findOne({ email });

        if (!user || !user.comparePassword(password)) { // Comparer les mots de passe
            someErrorVariable = 'Nom d’utilisateur ou mot de passe incorrect.';
            return res.render('index', { error: someErrorVariable }); // Rendre à nouveau la page index avec l'erreur
        }

        // Générer le token et l'envoyer dans un cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });; // Assurez-vous que le cookie est configuré
        res.redirect('/users/dashboard'); // Redirige vers le tableau de bord après connexion réussie
    } catch (err) {
        console.error('Erreur lors de la connexion:', err);
        someErrorVariable = 'Une erreur est survenue lors de la connexion.';
        res.render('index', { error: someErrorVariable }); // Rendre à nouveau la page index avec l'erreur
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');  // Supprimer le cookie
    res.redirect('/index');  // Rediriger vers la page de connexion
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
    logoutUser,
    createUser,
    updateUser,
    deleteUser,
};
