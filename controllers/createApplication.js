const jobApplication = require("../models/jobApplicationsModel");

const createApplication = async (req, res) => {
    try {
        const { role, company, jdUrl, appliedAt } = req.body;
        // data validation
        if (!role || !company) {
            return res.status(400).json({ error: "Role and company are required."});
        }
        const createNewApplication = await jobApplication.create({ role, company, jdUrl, appliedAt });

        if (!createNewApplication || createNewApplication.length === 0) {
            return res.status(400).json({ error: "New Application not Created."});
        }

        // successfull response
        return res.status(201).json(createNewApplication);

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

module.exports = createApplication;