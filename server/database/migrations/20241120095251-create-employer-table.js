"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employer", {
      empId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      department: {
        type: Sequelize.STRING(80),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter Department",
          },
        },
      },
      designation: {
        type: Sequelize.STRING(80),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter Designation",
          },
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "user",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      branchId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "branch",
          key: "id",
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("employer");
  },
};
