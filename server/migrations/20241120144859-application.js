"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("application", {
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
      },

      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("under review", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "under review",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("application");
  },
};
