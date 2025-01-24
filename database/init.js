const { Sequelize } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

// sequelize instance
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, process.env.DB_FILE),
});

// database connection
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database Connected.");
    } catch (error) {
        console.error("Unable to connect the Database.", error);
    }
}

module.exports = { sequelize, connectDB };