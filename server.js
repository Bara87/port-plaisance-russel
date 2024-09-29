const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoose'); // Importer le fichier mongoose
const catwaysRoutes = require('./routes/catways'); // Importer les routes
const reservationsRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users'); // Chemin vers vos routes

// Déterminer l'environnement (dev, prod, etc.)
const env = process.env.NODE_ENV || 'dev';

// Charger le fichier .env approprié en fonction de l'environnement
dotenv.config({ path: `./env/.env.${env}` });


// Créer l'application Express
const app = express();
app.use(express.json()); // Middleware pour parser le corps des requêtes JSON
app.use(express.urlencoded({ extended: true }));


// Définir le moteur de templates comme EJS
app.set('view engine', 'ejs');



const PORT = process.env.PORT || 6000;


// Connexion à MongoDB
connectDB(); // Appeler la fonction de connexion

// Utiliser les routes 
app.use('/catways', catwaysRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/users', userRoutes); // Utilisation des routes utilisateurs

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack); // Log l'erreur dans la console
  res.status(500).json({ message: 'Une erreur est survenue.', error: err.message });
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});