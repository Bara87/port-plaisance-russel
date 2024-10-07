const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


/**
 * Générer un token JWT pour un utilisateur.
 * @param {Object} user - L'objet utilisateur pour lequel générer le token.
 * @returns {string} - Le token JWT généré.
 */
exports.generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Comparer un mot de passe en texte clair avec un mot de passe haché.
 * @param {string} inputPassword - Le mot de passe en texte clair fourni par l'utilisateur.
 * @param {string} userPassword - Le mot de passe haché stocké en base de données.
 * @returns {Promise<boolean>} - Une promesse qui résout à true si les mots de passe correspondent, sinon false.
 */
exports.comparePassword = async (inputPassword, userPassword) => {
    return await bcrypt.compare(inputPassword, userPassword);
};

/**
 * Connexion d'un utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} - Une promesse qui résout l'objet utilisateur si la connexion réussit.
 * @throws {Error} - Lance une erreur si l'email ou le mot de passe est incorrect.
 */
exports.loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await exports.comparePassword(password, user.password))) { // Assurez-vous d'utiliser user.password
        throw new Error('Nom d’utilisateur ou mot de passe incorrect.');
    }
    return user;
};

/**
 * Créer un nouvel utilisateur.
 * @param {Object} userData - Les données de l'utilisateur à créer.
 * @returns {Promise<Object>} - Une promesse qui résout l'objet utilisateur créé.
 */
exports.createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

/**
 * Modifier un utilisateur existant.
 * @param {string} userId - L'ID de l'utilisateur à modifier.
 * @param {Object} updateData - Les données à mettre à jour.
 * @returns {Promise<Object>} - Une promesse qui résout l'objet utilisateur mis à jour.
 */
exports.updateUser = async (userId, updateData) => {
    if (updateData.password) {
        updateData.password = bcrypt.hashSync(updateData.password, 10); // Hacher le mot de passe
    }
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

/**
 * Supprimer un utilisateur par ID.
 * @param {string} userId - L'ID de l'utilisateur à supprimer.
 * @returns {Promise<Object|null>} - Une promesse qui résout l'objet utilisateur supprimé ou null si non trouvé.
 */
exports.deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};