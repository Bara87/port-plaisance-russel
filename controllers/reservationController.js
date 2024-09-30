const reservationService = require('../services/reservationService');

// Obtenir toutes les réservations pour un catway
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.render('reservations/list', { reservations });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

// Obtenir une réservation par ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.idReservation);
        if (!reservation) return res.status(404).json({ error: 'Reservation non trouvée'});
        res.render('reservations/detail', { reservation });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
    try {
        const { clientName, boatName, checkIn, checkOut } = req.body;
        const newReservation = await reservationService.createReservation(
            req.params.id,
            clientName,
            boatName,
            checkIn,
            checkOut
        );
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création' });
    }
};


// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await reservationService.deleteReservation(req.params.idReservation, req.params.id);
        if (!deletedReservation) return res.status(404).json({ error: 'Réservation non trouvée' });
        res.json({ message: 'Reservation supprimée'});
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};