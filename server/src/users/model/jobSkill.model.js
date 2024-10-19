const JobPost = require("../../jobs/jobPost.model");
const Skill = require("../../skills/skills.model");

module.exports = (sequelize, DataTypes) => {
  const JobSkill = sequelize.define(
    "JobSkill",
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
          model: JobPost,
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
      tableName: "jobSkill",
      timestamps: false,
    }
  );

  return JobSkill;
};
