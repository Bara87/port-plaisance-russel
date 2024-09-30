const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Fonction pour générer un token JWT
exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Fonction pour vérifier le mot de passe
exports.comparePassword = (inputPassword, userPassword) => {
    return bcrypt.compareSync(inputPassword, userPassword);  // Comparer les mots de passe
};

// Connexion de l'utilisateur
exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) { // Utilisation de user.comparePassword
        throw new Error('Nom d’utilisateur ou mot de passe incorrect.');
    }
    return user;
};
// Créer un utilisateur
exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Modifier un utilisateur
exports.updateUser = async (userId, updateData) => {
    if (updateData.password) {
        updateData.password = bcrypt.hashSync(updateData.password, 10); // Hacher le mot de passe
    }
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Supprimer un utilisateur
exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};