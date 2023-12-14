const express = require("express");
const router = express.Router();
const settingsController = require("../Controllers/SettingsController");

const authMiddleware = require("../Middlewares/AuthMiddleware");

router
  .route("/get-settings")
  .get(settingsController.getSettings);

router
  .route("/update-settings")
  .put(authMiddleware.protect, settingsController.updateSettings);

module.exports = router;