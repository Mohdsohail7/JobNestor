const express = require("express");
const { getAllApplications, getApplicationByCompanyName, getApplicationByStatus, getApplicationByAppliedAt, getApplicationById, } = require("../controllers/fetchApplication");
const router = express.Router();

// route for get all applications
router.get("/applications", getAllApplications);
router.get("/applications/company", getApplicationByCompanyName);
router.get("/applications/status", getApplicationByStatus);
router.get("/applications/appliedat", getApplicationByAppliedAt);

// route for specific id
router.get("/applications/:id", getApplicationById);

module.exports = router;