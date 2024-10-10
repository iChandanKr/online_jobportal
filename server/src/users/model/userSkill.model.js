const Skills = require("../../skills/skills.model");
const User = require("./user.model");
module.exports = (sequelize, DataTypes) => {
  const userSkills = sequelize.define(
    "UserSkills",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.UUID,
        // allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      SkillId: {
        type: DataTypes.UUID,
        // allowNull: false,
        references: {
          model: Skills,
          key: "id",
        },
      },
      // experience: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     validate: {
      //         min: 0,
      //     },
      // },
    },
    {
      tableName: "userSkills",
      timestamps: false,
    }
  );

  return userSkills;
};
