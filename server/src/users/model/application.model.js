const User = require("./user.model");
const Jobpost = require("../../jobs/jobPost.model");

module.exports = (sequelize, DataTypes) => {
  const application = sequelize.define(
    "Application",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      JobPostId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Jobpost,
          key: "id",
        },
      },

      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("under review", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "under review",
      },
    },
    {
      tableName: "application",
      timestamps: true,
    }
  );

  return application;
};
