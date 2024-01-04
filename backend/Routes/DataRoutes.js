// data routes

const express = require("express");
const router = express.Router();

const dataController = require("../Controllers/DataController");

router.get("/", dataController.getData);
router.post("/", dataController.createData);
router.put("/", dataController.updateFirstData);

module.exports = router;

