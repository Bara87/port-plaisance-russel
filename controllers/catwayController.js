const Catway = require('../models/Catway');


// Obtenir tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways/list', { catways });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Obtenir un catway par ID
exports.getCatwayById = async (req, res) => {
    try{
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.render('catways/detail', { catway });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création', details: error.message})
    }
};

// Mettre à jour un catway
exports.updateCatway = async (req, res) => {
    try {
        const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!updatedCatway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.redirect(`/catways/detail/${id}`); // Rediriger vers le détail du catway mis à jour
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour', details: error.message});
    }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
    try {
        const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
        if (!deletedCatway) return res.status(404).json({ error: 'Catway non trouvé'});
        res.redirect('/catways/list'); // Rediriger vers la liste des catways
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

