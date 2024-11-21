"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("jobPosts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter the title",
          },
        },
        set(value) {
          this.setDataValue("title", value?.trim());
        },
      },
      description: {
        type: Sequelize.STRING(2000),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter the description",
          },
        },
        set(value) {
          this.setDataValue("description", value?.trim());
        },
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter the role",
          },
        },
        set(value) {
          this.setDataValue("role", value?.trim());
        },
      },
      location: {
        type: Sequelize.ENUM("remote", "onsite"),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter the companyName",
          },
        },
        set(value) {
          this.setDataValue("companyName", value?.trim());
        },
      },

      industryName: {
        type: Sequelize.ENUM(
          "software",
          "finance",
          "accounting",
          "manufacturing",
          "construction"
        ),
        allowNull: false,
      },
      skillId: {
        type: Sequelize.ARRAY(Sequelize.UUID),
        allowNull: true,
      },
      minSalary: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Min salary must be an integer",
          },
        },
      },
      maxSalary: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: "Max salary must be an integer",
          },
          isGreaterThanMin(value) {
            if (value && parseInt(value) < parseInt(this.minSalary)) {
              throw new Error(
                "Max salary must be greater than or equal to min salary"
              );
            }
          },
        },
      },
      applicationDeadline: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Application deadline must be a valid date and time",
          },
          isAfter: {
            args: new Date().toISOString(),
            msg: "Application deadline must be a future date and time",
          },
        },
      },
      jobType: {
        type: Sequelize.ENUM("full-time", "part-time", "internship"),
        allowNull: false,
      },
      shift: {
        type: Sequelize.ENUM("morning", "evening"),
        allowNull: false,
      },
      empId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "employer",
          key: "empId",
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("jobPosts");
  },
};
