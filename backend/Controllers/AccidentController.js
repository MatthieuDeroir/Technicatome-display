const AccidentSchema = require('../Models/AccidentModel');

exports.getAccident = async (req, res) => {
    try {
        const accident = await AccidentSchema.findOne();
        if (!accident) throw new Error('Accident Info not found');
            await accident.save();
            res.status(201).send(accident);
            return;

        res.status(200).send(accident);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Fonction pour mettre à jour les jours sans accident, peut être appelée sans requête/réponse HTTP
exports.updateDaysWithoutAccident = async () => {
    const accidentInfo = await AccidentSchema.findOne();

    if (!accidentInfo) {
        // Logic for creating the document if it doesn't exist...
    }

    const currentDate = new Date();
    const daysElapsed = Math.floor((currentDate - accidentInfo.lastUpdated) / (1000 * 60 * 60 * 24));

    accidentInfo.daysWithoutAccident += daysElapsed;
    if(accidentInfo.daysWithoutAccident > accidentInfo.recordDaysWithoutAccident) {
        accidentInfo.recordDaysWithoutAccident = accidentInfo.daysWithoutAccident;
    }
    accidentInfo.lastUpdated = currentDate;

    await accidentInfo.save();

    return accidentInfo;
}

// Handler pour la route HTTP, qui utilise la fonction ci-dessus et gère la requête/réponse HTTP
exports.addDayWithoutAccident = async (req, res) => {
    try {
        const accidentInfo = await updateDaysWithoutAccident();
        res.status(200).json(accidentInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





exports.updateAccident = async (req, res) => {
    try {
        // update all felds with body
        const accidentInfo = await AccidentSchema.findOne();
        if (!accidentInfo) throw new Error('Accident Info not found');

        accidentInfo.daysWithoutAccident = req.body.daysWithoutAccident;
        accidentInfo.recordDaysWithoutAccident = req.body.recordDaysWithoutAccident;
        accidentInfo.numberOfAccidentsSinceStartOfTheYear = req.body.numberOfAccidentsSinceStartOfTheYear;
        accidentInfo.scrollingText = req.body.scrollingText;

        await accidentInfo.save();
        res.status(200).json(accidentInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.initializeAccident = async (req, res) => {
    try {
        const accident = await AccidentSchema.findOne();
        if (!accident) {
            const defaultAccident = new AccidentSchema({
                daysWithoutAccident: 0,
                recordDaysWithoutAccident: 0,
                numberOfAccidentsSinceStartOfTheYear: 0,
                scrollingText: "",
            });
            await defaultAccident.save();
            console.log('Accident document initialized successfully');
        } else {
            console.log('Accident document already exists');
        }
    } catch (error) {
        console.error('Error initializing accident document:', error);
    }
};

exports.updateResetOnNewYear = async (req, res) => {
    try {
        const accidentInfo = await AccidentSchema.findOne();
        if (!accidentInfo) throw new Error('Accident Info not found');

        accidentInfo.resetOnNewYear = req.body.resetOnNewYear;

        await accidentInfo.save();
        res.status(200).json(accidentInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const resetAccidentsOnNewYear = async () => {
    const accidentInfo = await AccidentSchema.findOne();
    if (!accidentInfo) throw new Error('Accident Info not found');

    if (accidentInfo.resetOnNewYear) {
        accidentInfo.numberOfAccidentsSinceStartOfTheYear = 0;
        await accidentInfo.save();
    }
}
