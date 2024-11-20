"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employer", {
      empId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      designation: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      branchId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: true,
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
    await queryInterface.dropTable("employer");
  },
};
