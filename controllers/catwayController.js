const catwayService = require('../services/catwayService');
const Catway = require('../models/Catway');

/**
 * Obtenir tous les catways.
 * Récupère la liste de tous les catways en appelant le service correspondant et renvoie la vue associée.
 * 
 * @async
 * @function getAllCatways
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie une réponse avec la liste des catways ou une erreur serveur.
 */

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.render('catways/list', { catways });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};



/**
 * Obtenir un catway par ID.
 * Récupère un catway spécifique en fonction de son identifiant et renvoie la vue détaillée associée.
 * 
 * @async
 * @function getCatwayById
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie un catway spécifique ou une erreur si non trouvé.
 */
exports.getCatwayById = async (req, res) => {
    try{
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.render('catways/detail', { catway });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};


/**
 * Créer un nouveau catway.
 * Envoie une demande de création d'un catway en utilisant les données du corps de la requête.
 * 
 * @async
 * @function createCatway
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie le catway créé ou une erreur si la création échoue.
 */
exports.createCatway = async (req, res) => {
    try {
        const newCatway = await catwayService.createCatway(req.body);
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création', details: error.message})
    }
};


/**
 * Mettre à jour l'état d'un catway.
 * Met à jour l'état d'un catway spécifique en fonction de son numéro et du nouvel état fourni.
 * 
 * @async
 * @function updateCatwayState
 * @param {Object} req - L'objet de requête Express, contenant `catwayNumber` et `newCatwayState` dans le corps.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie un message de succès ou une erreur si la mise à jour échoue.
 */
exports.updateCatwayState = async (req, res) => {
    try {
        const { catwayNumber, newCatwayState } = req.body;  

        // Appeler le service pour mettre à jour l'état
        const updatedCatway = await catwayService.updateCatwayState(catwayNumber, newCatwayState);

        res.status(200).json({ message: 'Catway mis à jour avec succès', updatedCatway });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour', details: error.message });
    }
};


/**
 * Supprimer un catway.
 * Supprime un catway en fonction de son numéro.
 * 
 * @async
 * @function deleteCatway
 * @param {Object} req - L'objet de requête Express, contenant `catwayNumber` dans le corps.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie un message de succès ou une erreur si la suppression échoue.
 */
exports.deleteCatway = async (req, res) => {
    try {
        const { catwayNumber } = req.body; // Obtenir le catwayNumber du corps de la requête

        // Appeler le service pour supprimer le catway
        const deletedCatway = await catwayService.deleteCatway(catwayNumber);

        if (!deletedCatway) {
            return res.status(404).json({ error: 'Catway non trouvé' });
        }

        // Retourner un message de succès
        res.json({ message: 'Catway supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression', details: error.message });
    }
};