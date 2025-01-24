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

const updateJobApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const {status, interviewRounds} = req.body;

        if (!status || !interviewRounds) {
            return res.status(400).json({ error: "data is missing."});
        }

        const findData = await jobApplication.findByPk(id);
        if (!findData || findData.length === 0) {
            return res.status(404).json({ error: "Application not found."})
        }
        const validateStatus = ['no reply', 'rejected', 'interview', 'selected', 'accepted'];
        if (status && !validateStatus.includes(status)) {
            return res.status(400).json({ error: "Invalid status value."});
        }

        const updateData = findData.set({ status, interviewRounds });
        const result = await updateData.save();
        if (!result) {
            return res.status(400).json({ error: "Data not updated."});
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

const deleteApplicationByid = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Id is required."});
        }
        const findApplication = await jobApplication.findByPk(id);
        if (!findApplication) {
            return res.status(404).json({ error: "Application not found."});
        }
        await findApplication.destroy();
        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error.", error });
    }
}

module.exports = { createApplication , updateJobApplicationById, deleteApplicationByid };