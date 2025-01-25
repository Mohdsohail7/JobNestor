const express = require("express");
const { createInterview, getAllInterviewSpecificJobApplication } = require("../controllers/createInterview");
const router = express.Router();

// route for create interview for specific job application
router.post("/applications/:id/interview", createInterview);

// route for get interviews for specific job application
router.get("/applications/:id/interview", getAllInterviewSpecificJobApplication);

module.exports = router;