const Reservation = require('../models/Reservation');


/**
 * Obtenir toutes les réservations.
 * @returns {Promise<Array>} - Une promesse qui résout un tableau de réservations.
 */
exports.getAllReservations = async () => {
    return await Reservation.find();  // Logique métier ici
};

/**
 * Obtenir une réservation par ID.
 * @param {string} idReservation - L'ID de la réservation à récupérer.
 * @returns {Promise<Object|null>} - Une promesse qui résout l'objet réservation ou null si non trouvé.
 */
exports.getReservationById = async (idReservation) => {
    return await Reservation.findById(idReservation);
};

/**
 * Créer une nouvelle réservation.
 * @param {string} catwayNumber - Le numéro du catway pour la réservation.
 * @param {string} clientName - Le nom du client.
 * @param {string} boatName - Le nom du bateau.
 * @param {Date} checkIn - La date d'arrivée.
 * @param {Date} checkOut - La date de départ.
 * @returns {Promise<Object>} - Une promesse qui résout l'objet réservation créé.
 */
exports.createReservation = async (catwayNumber, clientName, boatName, checkIn, checkOut) => {
    const newReservation = new Reservation({
        catwayNumber,
        clientName,
        boatName,
        checkIn,
        checkOut
    });

    // Sauvegarde de la nouvelle réservation dans MongoDB et retour de l'objet complet
    return await newReservation.save();
};

/**
 * Supprimer une réservation par ID.
 * @param {string} reservationId - L'ID de la réservation à supprimer.
 * @returns {Promise<Object|null>} - Une promesse qui résout l'objet réservation supprimé ou null si non trouvé.
 */
exports.deleteReservation = async (reservationId) => {
    return await Reservation.findByIdAndDelete(reservationId);
};