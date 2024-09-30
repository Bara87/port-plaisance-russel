const Catway = require('../models/Catway');

// Obtenir tous les catways
exports.getAllCatways = async () => {
    return await Catway.find();
};

// Obtenir un catway par ID
exports.getCatwayById = async (id) => {
    return await Catway.findById(id);
};

// Créer un nouveau catway
exports.createCatway = async (catwayData) => {
    const newCatway = new Catway(catwayData);
    return await newCatway.save();
};

// Update catway
// Mettre à jour l'état du catway
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
// Supprimer un catway
exports.deleteCatway = async (catwayNumber) => {
    try {
        // Rechercher le catway par son numéro et le supprimer
        const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: catwayNumber });

        return deletedCatway; // Retourner le catway supprimé (ou null si non trouvé)
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du catway : ${error.message}`);
    }
};