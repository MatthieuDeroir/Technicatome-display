const SettingsSchema = require("../Models/SettingsModel");

exports.initializeSettings = async (req, res) => {
  try {
    const settings = await SettingsSchema.findOne();
    if (!settings) {
      const defaultSettings = new SettingsSchema({
        enable: false,
        stop: "20",
        start: "8",
        date: Date.now(),
      });
      await defaultSettings.save();
      console.log("Settings document initialized successfully");
    } else {
      console.log("Settings document already exists");
    }
  } catch (error) {
    console.error("Error initializing settings document:", error);
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await SettingsSchema.find({});
    res.status(200).send(settings);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};


exports.updateSettings = async (req, res) => {
  try {
    const settingsUpdated = await SettingsSchema.findOneAndUpdate(
      { _id: req.body._id},
      req.body,
      { new: true }
    );
    if (!settingsUpdated) {
      res.status(404).send("Aucun paramètre trouvé avec cet ID");
    } else {
      res.status(200).send(settingsUpdated);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};