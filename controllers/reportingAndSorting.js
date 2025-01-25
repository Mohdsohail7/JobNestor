const { Op, Sequelize } = require("sequelize");
const jobApplication = require("../models/jobApplicationsModel");

// reprt total application
const getTotalJobApplication = async (req, res) => {
    try {
        const { from, to } = req.query;
        // validate
        if (!from || !to) {
            return res.status(400).json({ error: "'from' and 'to' are require."});
        }
        // count total job application
        const totalApplication = await jobApplication.count({ where: {
            appliedAt: {[Op.between]: [new Date(from), new Date(to)]}
        }});

        console.log("Total Application-->", totalApplication)

        if (!totalApplication || totalApplication.length === 0) {
            return res.status(404).json({ error: "application not found."});
        }
        return res.status(200).json(totalApplication);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

// retrieves job application by status
const getJobApplicationByStatus = async (req, res) => {
    try {
        // find the job application and grouped by status
        const findJobByStatus = await jobApplication.findAll({
            attributes: [
                "status",
                [Sequelize.fn("COUNT", Sequelize.col("status")), "count"],
            ],
            group: "status",
        });

        if (!findJobByStatus) {
            return res.status(404).json({ error: "application not found."})
        }
        // convert object into array
        const statusSummary = findJobByStatus.map((job) => ({
            status: job.status,
            count: parseInt(job.dataValues.count, 10),
        }));
        // successfull response
        return res.status(200).json(statusSummary);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

module.exports = { getTotalJobApplication, getJobApplicationByStatus };