const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Exportation des fonctions
exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.comparePassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword);
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await exports.comparePassword(password, user.password))) { // Assurez-vous d'utiliser user.password
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