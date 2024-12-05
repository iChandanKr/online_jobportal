const { CustomError } = require("./apiResponse");
const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const { ValidationError, SequelizeDatabaseError } = require("sequelize");

// --- mapping of models with table names
const modelWithTable = new Map([
  ["jobPosts", "JobPost"],
  ["user", "User"],
]);
module.exports = async (rows, tableName) => {
  const validRows = [];
  const errorsOccured = [];

  const modelName = modelWithTable.get(tableName);
  const Model = sequelize.models[modelName];
  if (!Model) {
    throw new CustomError(`Table not found`, 404);
  }
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      const instance = Model.build(row);
      await instance.validate();
      validRows.push(row);
    } catch (validationError) {
      if (
        validationError instanceof ValidationError ||
        validationError instanceof SequelizeDatabaseError
      ) {
        errorsOccured.push({
          row: i + 1,
          errors: validationError.errors.map((e) => e.message),
        });
      } else {
        throw new CustomError(validationError.message, 400);
      }
    }
  }
  if (errorsOccured.length > 0) {
    throw new CustomError(errorsOccured, 400);
  }
  return { validRows, Model };
};
