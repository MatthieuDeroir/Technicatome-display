const moment = require('moment');
const AccidentSchema = require("../Models/AccidentModel");

exports.getAccident = async (req, res) => {
  try {
    const accident = await AccidentSchema.find();
    res.status(200).send(accident);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addDayWithoutAccident = async (req, res) => {
  try {
    const accidentInfo = await AccidentSchema.findOne();
    console.log("accidentInfo", accidentInfo);
    if (!accidentInfo) throw new Error("Accident Info not found");

    const lastUpdated = moment(accidentInfo.lastUpdated); // Assuming lastUpdated is a Date object
    console.log("lastUpdated", lastUpdated)
    const currentDate = moment();
    console.log("currentDate", currentDate)

    // Compare if a day or more has passed
    if (currentDate.diff(lastUpdated, 'days') >= 1) {
      if (accidentInfo.daysWithoutAccident + currentDate.diff(lastUpdated, 'days') < 999999) {
      accidentInfo.daysWithoutAccident += currentDate.diff(lastUpdated, 'days');
        } else {
        accidentInfo.daysWithoutAccident = 999999;
      }

      if (accidentInfo.daysWithoutAccident > accidentInfo.recordDaysWithoutAccident) {
        accidentInfo.recordDaysWithoutAccident = accidentInfo.daysWithoutAccident;
      }

      // Update lastUpdated to current date
      accidentInfo.lastUpdated = currentDate.toDate();

      await accidentInfo.save();
      console.log("Added a day without accident");
    } else {
      console.log("Less than a day passed since last update, no action taken");
    }
  } catch (err) {
    console.error("Error while adding a day without accident", err);
  }
};

exports.updateAccident = async (req, res) => {
  try {
    // update all felds with body
    const accidentInfo = await AccidentSchema.findOne();
    if (!accidentInfo) throw new Error("Accident Info not found");

    accidentInfo.daysWithoutAccident = req.body.daysWithoutAccident;
    accidentInfo.recordDaysWithoutAccident = req.body.recordDaysWithoutAccident;
    accidentInfo.numberOfAccidentsSinceStartOfTheYear =
      req.body.numberOfAccidentsSinceStartOfTheYear;
    accidentInfo.scrollingText = req.body.scrollingText;

    await accidentInfo.save();
    res.status(200).json(accidentInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDaysWithoutAccident = async (req, res) => {
  try {
    // update all felds with body
    const accidentInfo = await AccidentSchema.findOne();
    if (!accidentInfo) throw new Error("Accident Info not found");

    accidentInfo.daysWithoutAccident = req.body.daysWithoutAccident;

    await accidentInfo.save();
    res.status(200).json(accidentInfo);
  } catch (err) {
    console.log("Error while updating days without accident", err);
   
  }
};

exports.updateRecordDaysWithoutAccident = async (req, res) => {
  try {
    // update all felds with body
    const accidentInfo = await AccidentSchema.findOne();
    if (!accidentInfo) throw new Error("Accident Info not found");

    accidentInfo.recordDaysWithoutAccident = req.body.recordDaysWithoutAccident;

    await accidentInfo.save();
    res.status(200).json(accidentInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateNumberOfAccidentsSinceStartOfTheYear = async (req, res) => {
  try {
    // update all felds with body
    const accidentInfo = await AccidentSchema.findOne();
    if (!accidentInfo) throw new Error("Accident Info not found");

    accidentInfo.numberOfAccidentsSinceStartOfTheYear +=
      req.body.numberOfAccidentsSinceStartOfTheYear;

    await accidentInfo.save();
    res.status(200).json(accidentInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateScrollingText = async (req, res) => {
  try {
    // update all felds with body
    const accidentInfo = await AccidentSchema.findOne();
    if (!accidentInfo) throw new Error("Accident Info not found");

    accidentInfo.scrollingText = req.body.scrollingText;

    await accidentInfo.save();
    res.status(200).json(accidentInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
      console.log("Accident document initialized successfully");
    } else {
      console.log("Accident document already exists");
    }
  } catch (error) {
    console.error("Error initializing accident document:", error);
  }
};
exports.newYear = async (req, res) => {
  try {
    const accidentInfo = await AccidentSchema.findOne();
    if (!accidentInfo) throw new Error("Accident Info not found");

    accidentInfo.resetOnNewYear = !accidentInfo.resetOnNewYear;

    await accidentInfo.save();
    res.status(200).json(accidentInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.updateResetOnNewYear = async (req, res) => {
  console.log("updateResetOnNewYear");
    try {
        const accidentInfo = await AccidentSchema.findOne();
        if (!accidentInfo) throw new Error('Accident Info not found');

        accidentInfo.resetOnNewYear = !accidentInfo.resetOnNewYear;
        if (req.body.resetOnNewYear) {
            accidentInfo.numberOfAccidentsSinceStartOfTheYear = 0;
        }

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

