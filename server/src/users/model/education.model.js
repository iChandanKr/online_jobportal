module.exports = (sequelize, DataTypes) => {
  const education = sequelize.define("Education", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tenthMarksPercent: {
      type: DataTypes.FLOAT,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1900,
        max: new Date().getFullYear(),
      },
    },
    twelfthMarksPercent: {
      type: DataTypes.FLOAT,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1900,
        max: new Date().getFullYear(),
      },
    },
    ugStream: {
      type: DataTypes.STRING(200),
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
      type: DataTypes.STRING(200),
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
      type: DataTypes.FLOAT,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1900,
        max: new Date().getFullYear(),
      },
    },
    pgStream: {
      type: DataTypes.STRING(200),
      set(value) {
        this.setDataValue("pgStream", value?.trim());
      },
    },
    pgPassingYear: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1900,
        max: new Date().getFullYear(),
      },
    },
  });
  return education;
};
