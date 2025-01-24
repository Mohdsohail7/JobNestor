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
 sequelize.sync({ force: true })
    .then(() => {
        console.log("Database synchronized successfully.");
    })
    .catch((err) => {
        console.error("Database synchronization failed:", err);
    });

// mount route
const createApplicationroute = require("./routes/createApplication");
const getAllApplicationsRoute = require("./routes/fetchApplication");
const getAllApplicationRouteByCompanyName = require("./routes/fetchApplication");
const getApplicationByStatusRoute = require("./routes/fetchApplication");
const getApplicationByAppliedAt = require("./routes/fetchApplication");
const getApplicationByIdRoute = require("./routes/fetchApplication");

// route
app.use("/v1/api", createApplicationroute);
app.use("/v1/api", getAllApplicationsRoute);
app.use("/v1/api", getAllApplicationRouteByCompanyName);
app.use("/v1/api", getApplicationByStatusRoute);
app.use("/v1/api", getApplicationByAppliedAt);
app.use("/v1/api", getApplicationByIdRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`);
});
