const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController')
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations/list:
 *   get:
 *     summary: Liste des réservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réservations
 *       401:
 *         description: Non autorisé
 */
router.get('/list', authMiddleware, reservationController.getAllReservations); 

/**
 * @swagger
 * /reservations/detail/{idReservation}:
 *   get:
 *     summary: Détails d'une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idReservation
 *         in: path
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la réservation
 *       404:
 *         description: Réservation non trouvée
 *       401:
 *         description: Non autorisé
 */
router.get('/detail/:idReservation', authMiddleware, reservationController.getReservationById); 

/**
 * @swagger
 * /reservations/create:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - clientName
 *               - boatName
 *               - checkIn
 *               - checkOut
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 description: Numéro du catway réservé
 *               clientName:
 *                 type: string
 *                 description: Nom du client
 *               boatName:
 *                 type: string
 *                 description: Nom du bateau
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *                 description: Date et heure d'arrivée du bateau
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *                 description: Date et heure de départ du bateau
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non autorisé
 */
router.post('/create', authMiddleware, reservationController.createReservation); 

/**
 * @swagger
 * /reservations/delete/{id}:
 *   post:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la réservation à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 *       401:
 *         description: Non autorisé
 */
router.post('/delete/:id', authMiddleware, reservationController.deleteReservation); 

module.exports = router;
