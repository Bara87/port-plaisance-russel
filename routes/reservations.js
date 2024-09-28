const express = require('express');
const router = express.Router();
const {
    getAllReservations, getReservationById, createReservation, deleteReservation
} = require('../controllers/reservationController');
const authMiddleware = require('../middleware/auth');


// Routes pour les reservations
router.get('/:id/reservations', authMiddleware, getAllReservations);
router.get('/:id/reservations/:idReservation', authMiddleware, getReservationById);
router.post('/:id/reservations', authMiddleware, createReservation);
router.delete('/:id/reservations/:idReservation', authMiddleware, deleteReservation);

module.exports = router;
