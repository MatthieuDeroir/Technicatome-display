const moongose = require('mongoose');

const AccidentSchema = new moongose.Schema({
    daysWithoutAccident: {
        type: Number,
        required: true
    },
    recordDaysWithoutAccident: {
        type: Number,
        required: true
    },
    numberOfAccidentsSinceStartOfTheYear: {
        type: Number,
        required: true
    },
    resetOnNewYear:{
        type: Boolean,
        default: true,
        required: true
    },
    scrollingText: {
        type: String
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const Accident = moongose.model('Accident', AccidentSchema);

module.exports = Accident;