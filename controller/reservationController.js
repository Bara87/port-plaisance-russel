const Reservation = require ('../models/Reservation');

// Obtenir toutes les réservations pour un catway
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

// Obtenir une réservation par ID
exports.getReservationsById = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.idReservation, catwayNumber: req.params.id});
        if (!reservation) return res.status(404).json({ error: 'Reservation non trouvée'});
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation ({
            catwayNumber: req.params.id,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            checkIn: req.body.checkIn,
            chekcOut: req.body.chekcOut

        });
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création'});
    }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findOneAndDelete({ _id: req.params.idReservation, catwayNumber: req.params.id });
        if (!deletedReservation) return res.status(404).json({ error: 'Réservation non trouvée' });
        res.json({ message: 'Reservation supprimée'});
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};