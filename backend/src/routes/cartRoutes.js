const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();
router.use("/", cartController);

module.exports = router;