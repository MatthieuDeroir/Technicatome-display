
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
    updateRecordDaysWithoutAccident,
    updateNumberOfAccidentsSinceStartOfTheYear,
    updateScrollingText
} = require('../controllers/accidentController');

const authMiddleware = require('../Middlewares/authMiddleware');

router.route('/')
    .get(authMiddleware.protect, getAccident)
    .put(authMiddleware.protect, updateAccident);

router.route('/add-day')
    .post(authMiddleware.protect, addDayWithoutAccident); // Peut-être que c'est mieux d'utiliser un cron job server-side pour cela

router.route('/update-days')
    .put(authMiddleware.protect, updateDaysWithoutAccident);

router.route('/update-record')
    .put(authMiddleware.protect, updateRecordDaysWithoutAccident);

router.route('/update-number')
    .put(authMiddleware.protect, updateNumberOfAccidentsSinceStartOfTheYear);

router.route('/update-text')
    .put(authMiddleware.protect, updateScrollingText);

module.exports = router;
