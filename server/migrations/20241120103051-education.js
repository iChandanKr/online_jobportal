"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Education", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      tenthMarksPercent: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "marks must be a numeric",
          },
          min: 0,
          max: 100,
        },
      },
      tenthPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      twelfthMarksPercent: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "marks must be a numeric",
          },
          min: 0,
          max: 100,
        },
      },
      twelfthPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      ugStream: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter under graduate stream",
          },
        },
        set(value) {
          this.setDataValue("ugStream", value?.trim());
        },
      },
      ugBranch: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter under graduate branch",
          },
        },
        set(value) {
          this.setDataValue("ugBranch", value?.trim());
        },
      },
      ugCGPA: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please Enter under graduate cgpa",
          },
          isNumeric: {
            min: 1,
            max: 10,
          },
        },
      },
      ugPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      pgStream: {
        type: Sequelize.STRING(200),
        allowNull: true,
        set(value) {
          this.setDataValue("pgStream", value?.trim());
        },
      },
      pgPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear(),
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
    await queryInterface.dropTable("Education");
  },
};
