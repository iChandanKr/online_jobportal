"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("skills", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      skillName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Please enter the skill name",
          },
        },
        set(value) {
          this.setDataValue("skillName", value?.trim());
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("skills");
  },
};
