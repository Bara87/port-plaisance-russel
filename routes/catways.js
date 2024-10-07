const express = require('express');
const router = express.Router();
const { getAllCatways, getCatwayById, createCatway, updateCatwayState, deleteCatway } = require('../controllers/catwayController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * /catways/list:
 *   get:
 *     summary: Obtenir la liste des catways
 *     description: Récupère tous les catways disponibles.
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Liste des catways.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Catway'
 *       401:
 *         description: Non autorisé
 */
router.get('/list', authMiddleware, getAllCatways);

/**
 * @swagger
 * /catways/detail/{id}:
 *   get:
 *     summary: Obtenir les détails d'un catway
 *     description: Récupère les détails d'un catway spécifique en fonction de son ID.
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du catway à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du catway.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
 *       404:
 *         description: Catway non trouvé
 *       401:
 *         description: Non autorisé
 */
router.get('/detail/:id', authMiddleware, getCatwayById); // Route pour le detail d'un catway

/**
 * @swagger
 * /catways/create:
 *   post:
 *     summary: Créer un nouveau catway
 *     description: Ajoute un nouveau catway à la liste.
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Catway créé avec succès.
 *       400:
 *         description: Erreur de validation.
 *       401:
 *         description: Non autorisé
 */
router.post('/create', authMiddleware, createCatway); 

/**
 * @swagger
 * /catways/updateState:
 *   post:
 *     summary: Mettre à jour l'état d'un catway
 *     description: Met à jour l'état d'un catway existant.
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *                 description: Numéro du catway à mettre à jour.
 *               catwayState:
 *                 type: string
 *                 description: Nouvel état du catway.
 *     responses:
 *       200:
 *         description: État du catway mis à jour avec succès.
 *       400:
 *         description: Erreur de validation.
 *       401:
 *         description: Non autorisé
 */
router.post('/updateState', authMiddleware,updateCatwayState);

/**
 * @swagger
 * /catways/delete/{catwayNumber}:
 *   post:
 *     summary: Supprimer un catway
 *     description: Supprime un catway de la liste.
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: catwayNumber
 *         required: true
 *         description: Numéro du catway à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès.
 *       404:
 *         description: Catway non trouvé.
 *       401:
 *         description: Non autorisé
 */
router.post('/delete/:catwayNumber', authMiddleware, deleteCatway);


module.exports = router;