
// Importer le modèle
const Accident = require('../Models/AccidentModel');

// Importer le controller
const AccidentController = require('../Controllers/AccidentController');

const express = require('express');
const router = express.Router();


const {
    getAccident,
    addDayWithoutAccident,
    updateAccident,
    updateDaysWithoutAccident,
    updateResetOnNewYear
} = require('../Controllers/AccidentController');

const authMiddleware = require('../Middlewares/AuthMiddleware');


router.route('/')
    .get(getAccident)
    .put(authMiddleware.protect, updateAccident);

router.route('/update-reset')
    .put(authMiddleware.protect, updateResetOnNewYear);


router.route('/add-day')
    .post(authMiddleware.protect, addDayWithoutAccident); // Peut-être que c'est mieux d'utiliser un cron job server-side pour cela

router.route('/update-days')
    .put(authMiddleware.protect, updateDaysWithoutAccident);


module.exports = router;
