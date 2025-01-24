const express = require("express");
const { createApplication, updateJobApplicationById, deleteApplicationByid, } = require("../controllers/createApplication");
const router = express.Router();

// route for create new application
router.post("/applications", createApplication);

// route for update job application
router.put("/applications/:id", updateJobApplicationById);
// route for delete application
// route for update job application
router.delete("/applications/:id", deleteApplicationByid);

module.exports = router;