const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();
router.use("/", bookController);

module.exports = router;
