const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  enable: {
    type: Boolean,
    default: false,
  },
  stop: {
    type: String,
  },
  start: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings;