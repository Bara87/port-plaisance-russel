const Catway = require('../models/Catway');

/**
 * Obtenir tous les catways.
 * @returns {Promise<Array>} - Une promesse qui résout un tableau de catways.
 */
exports.getAllCatways = async () => {
    return await Catway.find();
};

/**
 * Obtenir un catway par ID.
 * @param {string} id - L'ID du catway à récupérer.
 * @returns {Promise<Object|null>} - Une promesse qui résout l'objet catway ou null si non trouvé.
 */
exports.getCatwayById = async (id) => {
    return await Catway.findById(id);
};

/**
 * Créer un nouveau catway.
 * @param {Object} catwayData - Les données du catway à créer.
 * @returns {Promise<Object>} - Une promesse qui résout l'objet catway créé.
 */
exports.createCatway = async (catwayData) => {
    const newCatway = new Catway(catwayData);
    return await newCatway.save();
};

/**
 * Mettre à jour l'état d'un catway.
 * @param {string} catwayNumber - Le numéro du catway à mettre à jour.
 * @param {string} newCatwayState - Le nouvel état du catway.
 * @returns {Promise<Object>} - Une promesse qui résout l'objet catway mis à jour.
 * @throws {Error} - Lance une erreur si le catway n'est pas trouvé ou en cas d'échec de la mise à jour.
 */
exports.updateCatwayState = async (catwayNumber, newCatwayState) => {
    try {
        // Rechercher le catway par son numéro et mettre à jour son état
        const updatedCatway = await Catway.findOneAndUpdate(
            { catwayNumber: catwayNumber },  // Critère de recherche
            { catwayState: newCatwayState }, // Champs à mettre à jour
            { new: true }                    // Retourner le document mis à jour
        );

        if (!updatedCatway) {
            throw new Error('Catway non trouvé');
        }

        return updatedCatway;  // Retourner le catway mis à jour
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour de l'état du catway : ${error.message}`);
    }
};

/**
 * Supprimer un catway.
 * @param {string} catwayNumber - Le numéro du catway à supprimer.
 * @returns {Promise<Object|null>} - Une promesse qui résout l'objet catway supprimé ou null si non trouvé.
 * @throws {Error} - Lance une erreur en cas d'échec de la suppression.
 */
exports.deleteCatway = async (catwayNumber) => {
    try {
        // Rechercher le catway par son numéro et le supprimer
        const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: catwayNumber });

        return deletedCatway; // Retourner le catway supprimé (ou null si non trouvé)
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du catway : ${error.message}`);
    }
};