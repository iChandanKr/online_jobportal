module.exports = (sequelize, DataTypes) => {
  const branch = sequelize.define(
    "Branch",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      branchName: {
        type: DataTypes.STRING(150),
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
    },
    {
      tableName: "branch",
    }
  );
  return branch;
};
