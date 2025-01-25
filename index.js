const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./database/init");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json())

// database connection
connectDB();
// Synchronize models with database
//  const databaseSyncronization = async () => {
//     await sequelize.sync({ force: true })
//     .then(() => {
//         console.log("Database synchronized successfully.");
//     })
//     .catch((err) => {
//         console.error("Database synchronization failed:", err);
//     });
//  }
//  databaseSyncronization();

// mount route
const createApplicationroute = require("./routes/createApplication");
const getAllApplicationsRoute = require("./routes/fetchApplication");
const getAllApplicationRouteByCompanyName = require("./routes/fetchApplication");
const getApplicationByStatusRoute = require("./routes/fetchApplication");
const getApplicationByAppliedAt = require("./routes/fetchApplication");
const getApplicationByIdRoute = require("./routes/fetchApplication");
const updateJobApplicationRoute = require("./routes/createApplication");
const deleteApplicationRoute = require("./routes/createApplication");
const createInterviewRoute = require("./routes/interview");
const getAllInterviewRoute = require("./routes/interview");
const getReportTotalApplicationRoute = require("./routes/reportingAndSorting");
const getApplicationByStatusGroupRoute = require("./routes/reportingAndSorting");

// route
app.use("/v1/api", createApplicationroute);
app.use("/v1/api", getAllApplicationsRoute);
app.use("/v1/api", getAllApplicationRouteByCompanyName);
app.use("/v1/api", getApplicationByStatusRoute);
app.use("/v1/api", getApplicationByAppliedAt);
app.use("/v1/api", getApplicationByIdRoute);
app.use("/v1/api", updateJobApplicationRoute);
app.use("/v1/api", deleteApplicationRoute);
app.use("/v1/api", createInterviewRoute);
app.use("/v1/api", getAllInterviewRoute);
app.use("/v1/api", getReportTotalApplicationRoute);
app.use("/v1/api", getApplicationByStatusGroupRoute);



module.exports = { app }
