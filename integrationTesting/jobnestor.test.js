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
});

describe("Update job application API TEST", () => {
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
});

describe("Delete job application API TEST", () => {
    it("Delete /v1/api/applications/:id should Delete a job application successfully", async() => {
        const response = await request(app).delete("/v1/api/applications/6");
        expect(response.statusCode).toEqual(204);
        
    });

    it("Delete /v1/api/applications/:id should Return 404 if job application is not found for deletion", async() => {
        const response = await request(app).delete("/v1/api/applications/65");
        expect(response.statusCode).toEqual(404);
        expect(response.body.error).toEqual("Application not found.")  
    });
});


describe("create interview round API TEST", () => {
    it ("POST /v1/api/applications/:id/interview should create an interview round for job application", async () => {
        const res = await request(app).post("/v1/api/applications/3/interview").send({
            roundNum: 2,
            roundType: "live coding",
            interviewDate: "2024-02-15",
            questions: "Solve a React problem live",
            roleOffered: null,
            compensationOffered: null,
        });
    
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(expect.objectContaining({
            id: 11,
            applicationId: 3,
            roundNum: 2,
            roundType: "live coding",
            interviewDate: "2024-02-15T00:00:00.000Z",
            questions: "Solve a React problem live",
            roleOffered: null,
            compensationOffered: null,
        }));
        // we can also handle createdAt and updatedAt fields separately below like this
        expect(res.body).toHaveProperty("createdAt");
        expect(res.body).toHaveProperty("updatedAt");

    });

    it ("POST /v1/api/applications/:id/interview should Return 400 if required fields are missing", async () => {
        const res = await request(app).post("/v1/api/applications/1/interview").send({
            interviewDate: "2024-02-15",
            questions: "Solve a React problem live",
            roleOffered: null,
            compensationOffered: null,
        });
    
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual("roundNum, roundType, and interviewDate are required.")
    });

    it ("POST /v1/api/applications/:id/interview should Return 404 if job application is not found for adding an interview", async () => {
        const res = await request(app).post("/v1/api/applications/45/interview").send({
            roundNum: 2,
            roundType: "live coding",
            interviewDate: "2024-02-15",
            questions: "Solve a React problem live",
            roleOffered: null,
            compensationOffered: null,
        });
    
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toEqual("Job Application not found.")
    });

});

describe("Retrieve All Interviews for an Application", () => {
    it("GET /v1/api/applications/:id/interview should Retrieve all interview rounds for a job application", async () => {
        const res = await request(app).get("/v1/api/applications/1/interview");

        expect(res.statusCode).toBe(200);
        // we need to use arrayContaining method because in response i got an array
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: 1,
                applicationId: 1,
                roundNum: 1,
                roundType: "telephonic",
                interviewDate: "2024-02-10T00:00:00.000Z",
                questions: "What is your experience with React?",
                roleOffered: null,
                compensationOffered: null,
            }),
        ]));

        // each record have an createdAt AND updatedAt in array that's why we need to run loop
        res.body.forEach((interview) => {
            expect(interview).toHaveProperty("createdAt");
            expect(interview).toHaveProperty("updatedAt");
        });
    });

    it("GET /v1/api/applications/:id/interview should Return 404 if job application is not found", async () => {
        const res = await request(app).get("/v1/api/applications/78/interview");

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toEqual("Interiews not found by this job application.");
    });
});

describe("API Tests for Filtering and Sorting GET /applications", () => {
    it("GET /v1/api/applications?status=interview should return job applications with the specified status", async () => {
        const response = await request(app).get("/v1/api/applications/status?status=interview");
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: 3,
                role: "Full Stack Developer",
                company: "DevSolutions",
                jdUrl: "https://devsolutions.com/jobs/fullstack",
                appliedAt: "2024-01-25T00:00:00.000Z",
                status: "interview",
                interviewRounds: 1,
            }),
            expect.objectContaining({
                id: 7,
                role: "DevOps Engineer",
                company: "CloudFlow",
                jdUrl: "https://cloudflow.com/jobs/devops",
                appliedAt: "2024-01-18T00:00:00.000Z", 
                status: "interview",
                interviewRounds: 1,
            }),
        ]));
        response.body.forEach((jobApp) => {
            expect(jobApp).toHaveProperty("createdAt");
            expect(jobApp).toHaveProperty("updatedAt");
        });
    });

    it("GET /v1/api/applications??company=Tech Corp should return job applications with the specified Company name", async () => {
        const response = await request(app).get("/v1/api/applications/company?company=CodeWorks");
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: 2,
                role: "Backend Engineer",
                company: "CodeWorks",
                jdUrl: "https://codeworks.com/jobs/backend",
                appliedAt: "2024-01-20T00:00:00.000Z",
                status: "no reply",
                interviewRounds: 1,
            }),
        ]));
        response.body.forEach((jobApp) => {
            expect(jobApp).toHaveProperty("createdAt");
            expect(jobApp).toHaveProperty("updatedAt");
        });
    });

    it("GET /v1/api/applications?status=interview should Return 200 OK with an empty array when no applications match the filter", async () => {
        const response = await request(app).get("/v1/api/applications/status?status=no interview");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([]);
    });
});

describe("API Tests for Generating Reports", () => {
    it("GET /v1/api/reports/applications should generate a report of total applications in a time period", async () => {
        const res = await request(app).get("/v1/api/reports/applications?from=2024-01-01&to=2024-01-31");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(6);
    });

    it("GET /v1/api/reports/applications should generate a report of applications grouped by status", async () => {
        const res = await request(app).get("/v1/api/reports/applications/status?status=interview");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            {
                status: "accepted",
                count: 1,
            },
            {
                status: "interview",
                count: 3,
            },
            {
                status: "no reply",
                count: 4,
            },
            {
                status: "rejected",
                count: 2,
            },
        ]);
    });
});

describe("GET job application API TEST", () => {
    it("/v1/api/applications should Return 200 OK with an empty array when no applications exist", async ()=> {
        await sequelize.query('PRAGMA foreign_keys = OFF;');
        await jobApplication.destroy({ where: {} });
        await sequelize.query('PRAGMA foreign_keys = ON;');
        const res = await request(app).get("/v1/api/applications");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);

    });
});
