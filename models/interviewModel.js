const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/init");
const jobApplication = require("./jobApplicationsModel");

const interviewModel = sequelize.define("interviewModel", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    applicationId: {
        type: DataTypes.INTEGER,
        references: {
            model: "jobApplications",
            key: "id"
        }
    },
    roundNum: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roundType: {
        type: DataTypes.ENUM("telephonic", "offline", "online", "take home", "live coding", "theory"),
        allowNull: false
    },
    interviewDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    questions: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roleOffered: {
        type: DataTypes.STRING,
        allowNull: true
    },
    compensationOffered: {
        type: DataTypes.STRING,
        allowNull: true
    },
},{
    timestamps: true
}
);

interviewModel.associations = (models) => {
    jobApplication.hasMany(models.interviewModel, { foreignKey: "applicationId" });

    interviewModel.belongsTo(models.jobApplication, { foreignKey: "applicationId" });
}

module.exports = interviewModel;