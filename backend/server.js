const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();

const {
  initializeSlideshowStatus,
} = require("./Controllers/SlideshowStatutController");
const { initializeSettings } = require("./Controllers/SettingsController");
const {
  addDayWithoutAccident,
  initializeAccident,
  updateDaysWithoutAccident,
} = require("./Controllers/AccidentController");
const { initializeData } = require('./Controllers/DataController')

const { newYear } = require("./Controllers/AccidentController");

const accidentRoutes = require("./Routes/AccidentRoutes");
const userRoutes = require("./Routes/UserRoutes");
const slideshowRoutes = require("./Routes/SlideshowRoutes");
const mediaRoute = require("./Routes/MediaRoute");
const slideshowStatusRoute = require("./Routes/SlideshowStatutsRoutes");
const settingsRoutes = require("./Routes/SettingsRoutes");
const dataRoutes = require("./Routes/DataRoutes");
const app = express();

// Connecter à MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/BE23109_Technicatome_BDD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());

app.use(express.json());


addDayWithoutAccident().then(r => console.log(r));

cron.schedule("0 0 * * *", async () => {
  try {

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

try {
  initializeAccident();
  initializeSlideshowStatus();
  initializeSettings();
  initializeData();
} catch (error) {
  console.error("Error while initializing", error);
}
// Routes

app.use("/api/auth", userRoutes);
app.use("/api/accident", accidentRoutes);
app.use("/api/slideshow", slideshowRoutes);
app.use("/api/media", mediaRoute);
app.use("/api/slideshow-status", slideshowStatusRoute);
app.use("/api/settings", settingsRoutes);
app.use("/api/data", dataRoutes);

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error("error", err.stack);
  res.status(500).send("Something broke!");
});

// Démarrer le serveur
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
