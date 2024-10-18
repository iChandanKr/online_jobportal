const JobPost = require("../../jobs/jobPost.model");
const Skills = require("../../skills/skills.model");

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
          model: Skills,
          key: "id",
        },
      },
    },
    {
      tableName: "jobSkills",
      timestamps: false,
    }
  );

  return JobSkill;
};
