module.exports = (sequelize, DataTypes) => {
  const jobpost = sequelize.define(
    "JobPost",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(500),
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
        type: DataTypes.STRING(2000),
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
        type: DataTypes.STRING(50),
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
        type: DataTypes.ENUM("remote", "onsite"),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING(100),
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
        type: DataTypes.ENUM(
          "software",
          "finance",
          "accounting",
          "manufacturing",
          "construction"
        ),
        allowNull: false,
      },
      skillId: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
      },
      minSalary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Min salary must be an integer",
          },
        },
      },
      maxSalary: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.DATE,
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
        type: DataTypes.ENUM("full-time", "part-time", "internship"),
        allowNull: false,
      },
      shift: {
        type: DataTypes.ENUM("morning", "evening"),
        allowNull: false,
      },
    },
    {
      tableName: "jobPosts",
      timestamps: true,
      paranoid: true,
    }
  );
  return jobpost;
};
