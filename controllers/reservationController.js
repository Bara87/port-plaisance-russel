const reservationService = require('../services/reservationService');

/**
 * Obtenir toutes les réservations pour un catway.
 * Récupère toutes les réservations et les renvoie dans une vue de liste.
 * 
 * @async
 * @function getAllReservations
 * @param {Object} req - L'objet de requête Express.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie la liste des réservations ou une erreur serveur.
 */
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.render('reservations/list', { reservations });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};


/**
 * Obtenir une réservation par ID.
 * Récupère une réservation spécifique en fonction de son identifiant et renvoie la vue détaillée.
 * 
 * @async
 * @function getReservationById
 * @param {Object} req - L'objet de requête Express, contenant l'ID de la réservation dans `req.params`.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie la réservation ou une erreur si non trouvée.
 */
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.idReservation);
        if (!reservation) return res.status(404).json({ error: 'Reservation non trouvée'});
        res.render('reservations/detail', { reservation });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur'});
    }
};


/**
 * Créer une nouvelle réservation.
 * Valide les données de la réservation et crée une nouvelle entrée dans le système.
 * 
 * @async
 * @function createReservation
 * @param {Object} req - L'objet de requête Express, contenant les informations de la réservation dans `req.body`.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie les détails de la réservation créée ou une erreur si les données sont invalides.
 */
exports.createReservation = async (req, res) => {
    try {
        const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

        // Vérification des données
        if (!catwayNumber || !clientName || !boatName || !checkIn || !checkOut) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        }

        // Créer la nouvelle réservation
        const newReservation = await reservationService.createReservation(
            catwayNumber,
            clientName,
            boatName,
            checkIn,
            checkOut
        );

        // Retourner les détails de la réservation dans la réponse
        res.status(201).json({
            message: 'Réservation créée avec succès',
            reservation: newReservation // Inclut tous les détails de la réservation
        });
    } catch (error) {
        console.error('Erreur lors de la création de la réservation :', error);

        // Retourner une réponse d'erreur plus détaillée
        res.status(500).json({
            error: 'Erreur lors de la création de la réservation',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
};

/**
 * Supprimer une réservation.
 * Supprime une réservation spécifique en fonction de son ID.
 * 
 * @async
 * @function deleteReservation
 * @param {Object} req - L'objet de requête Express, contenant l'ID de la réservation à supprimer dans `req.body`.
 * @param {Object} res - L'objet de réponse Express.
 * @returns {Promise<void>} Renvoie un message de succès ou une erreur si la réservation n'a pas été trouvée.
 */
exports.deleteReservation = async (req, res) => {
    const { reservationId } = req.body;
    try {
        // Appel au service de suppression de réservation
        const deletedReservation = await reservationService.deleteReservation(reservationId);  
        if (!deletedReservation) {
            return res.status(404).json({ message: 'Réservation non trouvée.' });
        }
        res.json({ message: 'Réservation supprimée avec succès.' });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la suppression de la réservation.', error });
    }
};