const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/init");

const jobApplication = sequelize.define("jobApplication", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jdUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    appliedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('no reply', 'rejected', 'interview', 'selected', 'accepted'),
        defaultValue: 'no reply'
    },
    interviewRounds: {
        type: DataTypes.INTEGER,
         defaultValue: 0
    }
});

module.exports = jobApplication;