const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/mongoose'); // Importer le fichier mongoose
const catwaysRoutes = require('./routes/catways'); // Importer les routes
const reservationsRoutes = require('./routes/reservations');

dotenv.config(); // Charger les variables d'environnement

// Créer l'application Express
const app = express();

// Middleware pour analyser les corps de requêtes en JSON
app.use(express.json());

// Connexion à MongoDB
connectDB(); // Appeler la fonction de connexion

// Utiliser les routes pour /catways
app.use('/catways', catwaysRoutes);
app.use('/reservations', reservationsRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});