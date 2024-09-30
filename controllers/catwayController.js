const catwayService = require('../services/catwayService');
const Catway = require('../models/Catway');


// Obtenir tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.render('catways/list', { catways });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Obtenir un catway par ID
exports.getCatwayById = async (req, res) => {
    try{
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.render('catways/detail', { catway });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
    try {
        const newCatway = await catwayService.createCatway(req.body);
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création', details: error.message})
    }
};


// Contrôleur pour mettre à jour l'état d'un catway
exports.updateCatwayState = async (req, res) => {
    try {
        const { catwayNumber, newCatwayState } = req.body;  // Extraire les données du formulaire

        // Appeler le service pour mettre à jour l'état
        const updatedCatway = await catwayService.updateCatwayState(catwayNumber, newCatwayState);

        res.status(200).json({ message: 'Catway mis à jour avec succès', updatedCatway });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour', details: error.message });
    }
};

// Supprimer un catway
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