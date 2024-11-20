"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branch", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      branchName: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP "),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("branch");
  },
};
