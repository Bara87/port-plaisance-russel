const Catway = require('../models/Catway');


// Obtenir tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.json(catways);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Obtenir un catway par ID
exports.getCatwayById = async (req, res) => {
    try{
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.json(catway);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

// Créer un nouveau catway
exports.createCatway = async (req, resp) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création'})
    }
};

// Mettre à jour un catway
exports.updateCatway = async (req, res) => {
    try {
        const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!updatedCatway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.json(updatedCatway);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour'});
    }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
    try {
        const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
        if (!deletedCatway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.json({ message: 'Catway supprimé'});
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

