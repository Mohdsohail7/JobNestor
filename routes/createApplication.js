const express = require("express");
const createApplication = require("../controllers/createApplication");
const router = express.Router();

// route for create new application
router.post("/applications", createApplication);

module.exports = router;