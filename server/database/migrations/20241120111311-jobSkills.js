"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jobSkill", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      JobPostId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "jobPosts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      SkillId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "skills",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("jobSkill");
  },
};
