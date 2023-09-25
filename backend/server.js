const express = require('express');
const mongoose = require('mongoose');
const accidentRoutes = require('./Routes/AccidentRoutes');

const app = express();

// Connecter à MongoDB
mongoose.connect('mongodb://localhost/accidentDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/api/accident', accidentRoutes);

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
