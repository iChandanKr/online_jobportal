module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define("Role", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "employer", "jobseeker"],
      defaultValue: "jobseeker",
    },
  },{
    tableName: "role",
  });

  return role;
};
