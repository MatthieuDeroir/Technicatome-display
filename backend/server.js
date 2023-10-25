const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors'); // N'oubliez pas d'importer cors ici
require('dotenv').config();

const { addDayWithoutAccident, initializeAccident } = require('./controllers/accidentController');

const accidentRoutes = require('./Routes/AccidentRoutes');
const userRoutes = require('./Routes/UserRoutes');
const veilleRoutes = require('./Routes/VeilleRoutes');
const slideshowRoutes = require('./Routes/SlideshowRoutes');
const mediaRoute = require('./Routes/MediaRoute');

const app = express();

// Connecter à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/AccTechniDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware pour utiliser cors
app.use(cors()); // Utilisez cors ici - cela permettra les requêtes cross-origin

// Middleware pour parser le JSON
app.use(express.json());

// Tâche planifiée pour ajouter un jour sans accident à minuit tous les jours
cron.schedule('0 0 * * *', async () => {
    console.log('Running a job at 12:00 at midnight every day');
    try {
        await addDayWithoutAccident();
        console.log('Added a day without accident');
    } catch (error) {
        console.error('Error while adding a day without accident', error);
    }
});

try {
    initializeAccident();
} catch (error) {
    console.error('Error while initializing accident document', error);
}

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/accident', accidentRoutes);
app.use('/api/veille', veilleRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/media', mediaRoute);


// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error("error",err.stack);
    res.status(500).send('Something broke!');
});

// Démarrer le serveur
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
