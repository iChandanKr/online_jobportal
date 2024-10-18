const User = require("./user.model");
const Jobpost = require("../../jobs/jobPost.model");

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    "Application",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      JobpostId: {
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
        type: DataTypes.ENUM("applied", "under review", "accepted", "rejected"),
        allowNull: false,
      },
    },
    {
      tableName: "applications",
      timestamps: true,
    }
  );

  return Application;
};
