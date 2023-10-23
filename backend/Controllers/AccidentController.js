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
    if (!accidentInfo) throw new Error("Accident Info not found");

    accidentInfo.daysWithoutAccident += 1;
    if (
      accidentInfo.daysWithoutAccident > accidentInfo.recordDaysWithoutAccident
    ) {
      accidentInfo.recordDaysWithoutAccident = accidentInfo.daysWithoutAccident;
    }

    await accidentInfo.save();
    res.status(200).json(accidentInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAccident = async (req, res) => {

    console.log("updateAccident");
    console.log(req.body);
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
    res.status(500).json({ message: err.message });
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
