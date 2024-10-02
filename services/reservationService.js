const Reservation = require('../models/Reservation');



exports.getAllReservations = async () => {
    return await Reservation.find();  // Logique métier ici
};

exports.getReservationById = async (idReservation) => {
    return await Reservation.findById(idReservation);
};


// Service pour créer une reservation
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

// Service pour supprimer une reservation
exports.deleteReservation = async (reservationId) => {
    return await Reservation.findByIdAndDelete(reservationId);
};