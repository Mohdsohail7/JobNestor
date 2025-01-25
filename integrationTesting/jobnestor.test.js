const request = require("supertest");
const {app} = require("../index");
const { sequelize } = require("../database/init");
const jobApplication = require("../models/jobApplicationsModel");
const interviewModel = require("../models/interviewModel");
const seedTestData = require("../database/seed_test");


beforeAll(async () => {
    await sequelize.sync({ force: true });
    await seedTestData();
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
});


describe("GET Retrieves Job Application API TEST", () => {
    it("/v1/api/applications should return all job applications", async () => {
        const res = await request(app).get("/v1/api/applications");

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(11);
        const avoidTimeStamp = res.body.map(({ createdAt, updatedAt, ...rest}) => rest);
        expect(avoidTimeStamp).toEqual(
            [
                {
                    id: 1,
                    role: "Frontend Developer",
                    company: "Innovatech",
                    jdUrl: "https://innovatech.com/careers/frontend",
                    appliedAt: "2024-01-15T00:00:00.000Z",
                    status: "no reply",
                    interviewRounds: 0,
                },
                {
                    id: 2,
                    role: "Backend Engineer",
                    company: "CodeWorks",
                    jdUrl: "https://codeworks.com/jobs/backend",
                    appliedAt: "2024-01-20T00:00:00.000Z",
                    status: "no reply",
                    interviewRounds: 1,
                },
                {
                    id: 3,
                    role: "Full Stack Developer",
                    company: "DevSolutions",
                    jdUrl: "https://devsolutions.com/jobs/fullstack",
                    appliedAt: "2024-01-25T00:00:00.000Z",
                    status: "interview",
                    interviewRounds: 1,
                },
                {
                    id: 4,
                    role: "Data Analyst",
                    company: "DataDive",
                    jdUrl: "https://datadive.com/jobs/analyst",
                    appliedAt: "2024-02-05T00:00:00.000Z",
                    status: "no reply",
                    interviewRounds: 0,
                },
                {
                    id: 5,
                    role: "Machine Learning Engineer",
                    company: "AI Innovations",
                    jdUrl: "https://aiinnovations.com/careers/ml",
                    appliedAt: "2024-02-10T00:00:00.000Z",
                    status: "rejected",
                    interviewRounds: 2,
                },
                {
                    id: 6,
                    role: "Product Manager",
                    company: "VisionaryTech",
                    jdUrl: "https://visionarytech.com/careers/productmanager",
                    appliedAt: "2024-01-28T00:00:00.000Z",
                    status: "selected",
                    interviewRounds: 3,
                },
                {
                    id: 7,
                    role: "DevOps Engineer",
                    company: "CloudFlow",
                    jdUrl: "https://cloudflow.com/jobs/devops",
                    appliedAt: "2024-01-18T00:00:00.000Z",
                    status: "interview",
                    interviewRounds: 1,
                },
                {
                    id: 8,
                    role: "Cybersecurity Specialist",
                    company: "SecureNet",
                    jdUrl: "https://securenet.com/careers/cybersecurity",
                    appliedAt: "2024-02-03T00:00:00.000Z",
                    status: "no reply",
                    interviewRounds: 0,
                },
                {
                    id: 9,
                    role: "UI/UX Designer",
                    company: "CreativePixels",
                    jdUrl: "https://creativepixels.com/jobs/uiux",
                    appliedAt: "2024-02-08T00:00:00.000Z",
                    status: "accepted",
                    interviewRounds: 2,
                },
                {
                    id: 10,
                    role: "Technical Writer",
                    company: "DocuCraft",
                    jdUrl: "https://docucraft.com/jobs/technicalwriter",
                    appliedAt: "2024-01-30T00:00:00.000Z",
                    status: "rejected",
                    interviewRounds: 1,
                },
                {
                    id: 11,
                    role: "Frontend Developer",
                    company: "Innovatech",
                    jdUrl: "https://innovatech.com/careers/frontend",
                    appliedAt: "2024-01-15T00:00:00.000Z",
                    status: "no reply",
                    interviewRounds: 0,
                }
            ]
        )

    });

    it("/v1/api/applications/:id should return a Specific application by id", async () => {
        const res = await request(app).get("/v1/api/applications/1");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(expect.objectContaining({
            id: 1,
            role: "Frontend Developer",
            company: "Innovatech",
            jdUrl: "https://innovatech.com/careers/frontend",
            appliedAt: "2024-01-15T00:00:00.000Z",
            status: "no reply",
            interviewRounds: 0,
        }));
    });

    it("/v1/api/applications/:id should Return 404 if job application is not found", async () => {
        const res = await request(app).get("/v1/api/applications/54");
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toEqual("Application not found.");
    });

    it("Put /v1/api/applications/:id should Update a job application successfully", async() => {
        const response = await request(app).put("/v1/api/applications/1").send({
            status: "interview",
            interviewRounds: 1,
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining(
            {
                id: 1,
                role: "Frontend Developer",
                company: "Innovatech",
                jdUrl: "https://innovatech.com/careers/frontend",
                appliedAt: "2024-01-15T00:00:00.000Z",
                status: "interview",
                interviewRounds: 1,
            }
        ));
    });

    it("Put /v1/api/applications/:id should Return 404 if job application is not found for update", async() => {
        const response = await request(app).put("/v1/api/applications/56").send({
            status: "interview",
            interviewRounds: 1,
        });
        expect(response.statusCode).toEqual(404);
        expect(response.body.error).toEqual("Application not found.")
    });

    it("Put /v1/api/applications/:id should Return 400 if invalid data is provided", async() => {
        const response = await request(app).put("/v1/api/applications/2").send({
            status: "gshaj",
            interviewRounds: 1,
        });
        expect(response.statusCode).toEqual(400);
        expect(response.body.error).toEqual("Invalid status value.")
    });

    it("/v1/api/applications should Return 200 OK with an empty array when no applications exist", async ()=> {
        await sequelize.query('PRAGMA foreign_keys = OFF;');
        await jobApplication.destroy({ where: {} });
        await sequelize.query('PRAGMA foreign_keys = ON;');
        const res = await request(app).get("/v1/api/applications");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);

    });

    
});
