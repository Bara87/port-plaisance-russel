const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController')
const authMiddleware = require('../middleware/auth');


// Routes pour les reservations
router.get('/list', authMiddleware, reservationController.getAllReservations); // Route pour la liste des reservations
router.get('/detail/:idReservation', authMiddleware, reservationController.getReservationById); // Route pour le detail d'une reservation
router.post('/create', authMiddleware, reservationController.createReservation); // Route pour la création d'une nouvelle reservation
router.post('/delete/:id', authMiddleware, reservationController.deleteReservation); // Route pour supprimer une reservation

module.exports = router;
