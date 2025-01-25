const express = require("express");
const { getTotalJobApplication, getJobApplicationByStatus } = require("../controllers/reportingAndSorting");
const router = express.Router();

// route for report total application
router.get("/reports/applications", getTotalJobApplication);

// route for total application group by status
router.get("/reports/applications/status", getJobApplicationByStatus);

module.exports = router;