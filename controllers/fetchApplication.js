const { Op } = require("sequelize");
const jobApplication = require("../models/jobApplicationsModel")

// get all applications
const getAllApplications = async (req, res) => {
    try {
        const result = await jobApplication.findAll();
        console.log("Fetched applications:", result);
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "job application not found."});
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

// get application by company name
const getApplicationByCompanyName = async (req, res) => {
    try {
        const company = req.query.company;
        if (!company || company.length === 0) {
            return res.status(400).json({ error: "Company name is missing."});
        }
        const result = await jobApplication.findAll({ where: { company }});
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Application not found by this company name."});
        }
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

// get application by status
const getApplicationByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        if (!status || status.length === 0) {
            return res.status(400).json({ error: "status is missing."});
        }
        const resultByStatus = await jobApplication.findAll({ where: { status }});
        if (!resultByStatus || resultByStatus.length === 0) {
            return res.status(404).json({ error: "Application not found by this status."});
        }
        return res.status(200).json(resultByStatus);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

// get application by applied
const getApplicationByAppliedAt = async (req, res) => {
    try {
        const { from, to } = req.query;
        if (!from || !to) {
            return res.status(400).json({ error: "'from' and 'to' date parameters are required." });
        }
        const result = await jobApplication.findAll({ where: { appliedAt: {[Op.between]: [new Date(from), new Date(to)]} }});
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Application not found by this appliedAt."});
        }
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

// Retrieve a specific job application by ID.
const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id is missing."});
        }
        const result = await jobApplication.findByPk(id);
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Application not found."});
        }
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}
module.exports = { 
getAllApplications, 
getApplicationByCompanyName, 
getApplicationByStatus, 
getApplicationByAppliedAt,
getApplicationById
 };