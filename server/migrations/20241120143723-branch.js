"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branch", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      branchName: {
        type: Sequelize.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter Branch Name",
          },
        },
        set(value) {
          this.setDataValue("branchName", value?.trim());
        },
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "company",
          key: "id",
        },
      },
      addressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "companyAddress",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("branch");
  },
};
