// cronJobs.js
const cron = require('node-cron');
const { addDayWithoutAccident, newYear } = require('../Controllers/AccidentController');

const setupCronJobs = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            addDayWithoutAccident().then(r => console.log(r));
        } catch (error) {
            console.error('Error while adding a day without accident', error);
        }
    });

    cron.schedule('0 0 1 1 *', async () => {
        try {
            await newYear();
        } catch (error) {
            console.error('Error while adding a year without accident', error);
        }
    });

    // Ajoutez d'autres tâches cron ici si nécessaire
};

module.exports = setupCronJobs;
