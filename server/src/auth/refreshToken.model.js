module.exports = (sequelize, DataTypes) => {
  const refreshToken = sequelize.define("RefreshToken", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return refreshToken;
};
