const express = require('express');
const router = express.Router();
const {
    getAllReservations, getReservationById, createReservation, deleteReservation
} = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');


// Routes pour les reservations
router.get('/list', authMiddleware, getAllReservations); // Route pour la liste des reservations
router.get('/detail/:idReservation', authMiddleware, getReservationById); // Route pour le detail d'une reservation
router.post('/:id/reservations', authMiddleware, createReservation); // Route pour la création d'une nouvelle reservation
router.delete('/:id/reservations/:idReservation', authMiddleware, deleteReservation); // Route pour supprimer une reservation

module.exports = router;
