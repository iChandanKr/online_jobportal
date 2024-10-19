const Skill = require("../../skills/skills.model");
const User = require("./user.model");
module.exports = (sequelize, DataTypes) => {
  const userSkill = sequelize.define(
    "UserSkill",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      SkillId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Skill,
          key: "id",
        },
      },
      
    },
    {
      tableName: "userSkill",
      timestamps: false,
    }
  );

  return userSkill;
};
