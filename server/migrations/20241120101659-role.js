"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      role: {
        type: Sequelize.ENUM,
        values: ["admin", "employer", "jobseeker"],
        defaultValue: "jobseeker",
        unique: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("role");
  },
};
