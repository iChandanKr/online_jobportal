"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companyAddress", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      line1: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter Address",
          },
        },
        set(value) {
          this.setDataValue("line1", value?.trim());
        },
      },
      line2: {
        type: Sequelize.STRING(150),
        set(value) {
          this.setDataValue("line2", value?.trim());
        },
      },
      city: {
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: {
            msg: "please Enter Company's City",
          },
        },
        set(value) {
          this.setDataValue("city", value?.trim());
        },
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
        validate: {
          notEmpty: {
            msg: "please Enter Company's State",
          },
        },
        set(value) {
          this.setDataValue("state", value?.trim());
        },
        allowNull: false,
      },
      pincode: {
        type: Sequelize.STRING(6),
        allowNull: false,
        isNumeric: {
          args: true,
          msg: "Pincode must be numeric",
        },
        validate: {
          len: {
            args: [6, 6],
            msg: "Pincode must have exactly 6 digits",
          },
        },
      },
      country: {
        type: Sequelize.STRING(70),
        validate: {
          notEmpty: {
            msg: "please Enter Company's Country",
          },
        },
        set(value) {
          this.setDataValue("country", value?.trim());
        },
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("companyAddress");
  },
};
