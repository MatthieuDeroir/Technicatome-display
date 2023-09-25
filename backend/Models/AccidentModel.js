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
    scrollingText: {
        type: String
    }
});

const Accident = moongose.model('Accident', AccidentSchema);

module.exports = Accident;