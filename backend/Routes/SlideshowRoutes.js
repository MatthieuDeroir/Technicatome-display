const express = require("express");
const router = express.Router();
const slideshowController = require("../Controllers/slideshowController");
const authMiddleware = require("../Middlewares/authMiddleware");

// Route pour obtenir tous les slideshows
router
  .route("/")
  .get(authMiddleware.protect, slideshowController.getAllSlideshows)
  .post(authMiddleware.protect, slideshowController.createSlideshow);

// Route pour créer un nouveau slideshow

 
// Routes pour obtenir, mettre à jour et supprimer un slideshow spécifique par ID
router
  .route("/:id")
  .get(authMiddleware.protect, slideshowController.getSlideshow)
  .put(authMiddleware.protect, slideshowController.updateSlideshow)
  .delete(authMiddleware.protect, slideshowController.deleteSlideshow);

module.exports = router;
