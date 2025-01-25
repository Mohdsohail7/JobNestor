const { Router } = require("express");
const interviewModel = require("../models/interviewModel");
const jobApplication = require("../models/jobApplicationsModel");

// create new interview for specific job application
const createInterview = async (req, res) => {
    try {
        const { id } = req.params;
        const { roundNum, roundType, interviewDate, questions, roleOffered, compensationOffered } = req.body;

        // Validate the request body
        if (!roundNum || !roundType || !interviewDate) {
            return res.status(400).json({
                error: "roundNum, roundType, and interviewDate are required.",
            });
        }

        // Find the job application
        const jobApp = await jobApplication.findByPk(id);
        if (!jobApp) {
            return res.status(404).json({ error: "Job Application not found." });
        }

        // Create a new interview round
        const newInterview = await interviewModel.create({
            applicationId: jobApp.id,
            roundNum,
            roundType,
            interviewDate,
            questions,
            roleOffered,
            compensationOffered,
        });

        // Respond with the newly created interview
        return res.status(201).json(newInterview);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            error: "Internal Server Error",
            details: error.message,
        });
    }
};

// retrieve all interview for specific job application
const getAllInterviewSpecificJobApplication = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "job application id is missing."});
        }

        // fetch interiew
        const interiews = await interviewModel.findAll({ where: {
            applicationId: id
        }});
        if (!interiews || interiews.length === 0) {
            return res.status(404).json({ error: "Interiews not found by this job application."})
        }
        
        // successfull response
        return res.status(200).json(interiews);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

module.exports = { createInterview, getAllInterviewSpecificJobApplication }

