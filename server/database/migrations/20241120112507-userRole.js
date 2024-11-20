"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userRole", {
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },

      RoleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "role",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("userRole");
  },
};
