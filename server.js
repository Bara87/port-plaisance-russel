const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoose'); // Importer le fichier mongoose
const catwaysRoutes = require('./routes/catways'); // Importer les routes
const reservationsRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users'); // Chemin vers vos routes
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');




// Déterminer l'environnement (dev, prod, etc.)
const env = process.env.NODE_ENV || 'dev';

// Charger le fichier .env approprié en fonction de l'environnement
dotenv.config({ path: `./env/.env.${env}` });


// Créer l'application Express
const app = express();
app.use(express.json()); // Middleware pour parser le corps des requêtes JSON
app.use(express.urlencoded({ extended: true }));

// Middleware pour gérer la méthode override
app.use(methodOverride('_method'));

app.use(cookieParser());


// Configuration du moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const PORT = process.env.PORT || 6000;


// Connexion à MongoDB
connectDB(); // Appeler la fonction de connexion

// Utiliser les routes 
app.use('/catways', catwaysRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/users', userRoutes); // Utilisation des routes utilisateurs

// Middleware de gestion des erreurs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});



// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});