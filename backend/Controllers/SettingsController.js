// Controllers/SettingsController.js
const SettingsSchema = require("../Models/SettingsModel");
const { exec } = require('child_process');

/**
 * Update the Raspberry Pi system date/time from an ISO date string
 * @param {string} dateStr - Date string in ISO format (YYYY-MM-DDTHH:MM:SS.sssZ)
 * @returns {Promise<string>} - Resolves on successful date update
 */
function updateDate(dateStr) {
  console.log("updateDate -> received date:", dateStr);

  try {
    // Créer un objet Date à partir de la chaîne ISO
    const dateObj = new Date(dateStr);
    
    // Vérifier si la date est valide
    if (isNaN(dateObj.getTime())) {
      console.error("Format de date ISO invalide");
      return Promise.reject("Format de date ISO invalide");
    }
    
    // Extraire les composants de la date
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    
    // Format pour la commande date: YYYY-MM-DD HH:MM:SS
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log("Date formatée pour la commande:", formattedDate);

    return new Promise((resolve, reject) => {
      // Construire la commande pour mettre à jour la date
      const command = `sudo date -s "${formattedDate}"`;
      console.log("Command:", command);

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error("Erreur lors de la mise à jour de la date:", stderr);
          return reject(stderr);
        }
        console.log("Date mise à jour avec succès:", stdout.trim());
        resolve(stdout);
      });
    });
  } catch (error) {
    console.error("Erreur lors du traitement de la date:", error);
    return Promise.reject("Erreur lors du traitement de la date");
  }
}

/**
 * Initialize Settings if none exist
 */

/**
 * Plain helper function that initializes the settings.
 * Doesn't require `req` or `res`.
 */
async function initializeSettingsDoc() {
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
    // Re-throw so the caller knows there was an error
    throw error;
  }
}

/**
 * Export the helper so you can call it in server.js on startup
 */
exports.initializeSettingsDoc = initializeSettingsDoc;

/**
 * Export an Express handler that calls the helper
 * This is if you also want an HTTP endpoint like GET /api/initialize-settings
 */
exports.initializeSettings = async (req, res) => {
  try {
    await initializeSettingsDoc();
    // If successful, respond with status 200
    return res.status(200).send("Initialization successful");
  } catch (error) {
    console.error("Error initializing settings document:", error);
    return res.status(500).send(error.message);
  }
};

/**
 * Fetch all Settings
 */
exports.getSettings = async (req, res) => {
  try {
    const settings = await SettingsSchema.find({});
    res.status(200).json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

/**
 * Update a Settings document by its _id
 * Expects `req.body` containing {_id, enable, stop, start, date (string in DD/MM/YYYY HH:MM)}
 */
exports.updateSettings = async (req, res) => {
  try {
    const { _id, date } = req.body;

    // Attempt to update the document with the new data
    const settingsUpdated = await SettingsSchema.findOneAndUpdate(
      { _id },
      req.body,
      { new: true } // Return the updated document
    );

    if (!settingsUpdated) {
      return res.status(404).send("Aucun paramètre trouvé avec cet ID");
    }

    // If a date string was provided, update the system date
    if (date) {
      await updateDate(date);
    }

    res.status(200).json(settingsUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

