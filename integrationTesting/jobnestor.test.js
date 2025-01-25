const request = require("supertest");
const {app} = require("../index");
const { sequelize } = require("../database/init");
const jobApplication = require("../models/jobApplicationsModel");
const {applications, interviews} = require("../data.json");
const interviewModel = require("../models/interviewModel");


beforeAll(async () => {
    await sequelize.sync({ force: true });
    await jobApplication.bulkCreate(applications);
    await interviewModel.bulkCreate(interviews);
});

afterAll(async () => {
    sequelize.close();
});

describe("Create a Job Application API Test", () => {
    it("/v1/api/applications should create an application", async () => {
        const response = await request(app).post("/v1/api/applications").send({
            role: "Frontend Developer",
            company: "Innovatech",
            jdUrl: "https://innovatech.com/careers/frontend",
            appliedAt: "2024-01-15",
            
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.status).toEqual("no reply");
        expect(response.body.interviewRounds).toBe(0);
    });

    it("/v1/api/applications should return 400 if required fields are missing", async () => {
        const response = await request(app).post("/v1/api/applications").send({
            jdUrl: "https://innovatech.com/careers/frontend",
            appliedAt: "2024-01-15",
            
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toEqual("Role and company are required.");
    })
})