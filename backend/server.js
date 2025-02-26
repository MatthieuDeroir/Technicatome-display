// server.js
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();

const {
  initializeSlideshowStatus,
} = require("./Controllers/SlideshowStatutController");
const { initializeSettingsDoc } = require("./Controllers/SettingsController"); // <-- changed
const {
  addDayWithoutAccident,
  initializeAccident,
  updateDaysWithoutAccident,
  newYear,
} = require("./Controllers/AccidentController");
const { initializeData } = require("./Controllers/DataController");

// ... imports for routes

const accidentRoutes = require("./Routes/AccidentRoutes");
const userRoutes = require("./Routes/UserRoutes");
const slideshowRoutes = require("./Routes/SlideshowRoutes");
const mediaRoute = require("./Routes/MediaRoute");
const slideshowStatusRoute = require("./Routes/SlideshowStatutsRoutes");
const settingsRoutes = require("./Routes/SettingsRoutes");
const dataRoutes = require("./Routes/DataRoutes");

const app = express();

// Connect to MongoDB...
mongoose
  .connect("mongodb://127.0.0.1:27017/BE23109_Technicatome_BDD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());

// CRON jobs...
cron.schedule("0 * * * *", async () => {
  try {
    console.log("adding days?");
    await addDayWithoutAccident();
  } catch (error) {
    console.error("Error while adding a day without accident", error);
  }
});

cron.schedule("0 0 1 1 *", async () => {
  try {
    await newYear();
  } catch (error) {
    console.error("Error while adding a year without accident", error);
  }
});

// 1) Use the plain function (NOT the Express controller) to initialize on startup
try {
  initializeAccident();
  initializeSlideshowStatus();
  initializeSettingsDoc(); // changed
  initializeData();
} catch (error) {
  console.error("Error while initializing", error);
}

// 2) If you *also* want an HTTP endpoint to do this manually, define a route:
const { initializeSettings } = require("./Controllers/SettingsController");
app.get("/api/settings/initialize", initializeSettings);

// Routes...
app.use("/api/auth", userRoutes);
app.use("/api/accident", accidentRoutes);
app.use("/api/slideshow", slideshowRoutes);
app.use("/api/media", mediaRoute);
app.use("/api/slideshow-status", slideshowStatusRoute);
app.use("/api/settings", settingsRoutes);
app.use("/api/data", dataRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("error", err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

