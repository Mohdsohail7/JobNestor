const interviewModel = require("../models/interviewModel");
const jobApplication = require("../models/jobApplicationsModel");
const { sequelize, connectDB } = require("./init");
const {applications, interviews} = require("../data.json")


const seedTestData = async () => {
    try {
        connectDB();
        await sequelize.sync({ force: true });
        // seed job application data
        await jobApplication.bulkCreate(applications);

        // seed interview data
        await interviewModel.bulkCreate(interviews);

        console.log("Application data and interviews test data seeded successfully.");
    } catch (error) {
        console.log("Error detecting from data seeding.", error.message );
    }
}
// seedTestData();

module.exports = seedTestData;