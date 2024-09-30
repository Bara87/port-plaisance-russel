const Reservation = require('../models/Reservation');

exports.getAllReservations = async () => {
    return await Reservation.find();  // Logique métier ici
};

exports.getReservationById = async (idReservation) => {
    return await Reservation.findById(idReservation);
};

exports.createReservation = async (reservationData) => {
    const newReservation = new Reservation(reservationData);
    return await newReservation.save();
};

exports.deleteCatway = async (catwayNumber) => {
    return await Catway.findOneAndDelete({ catwayNumber });
};