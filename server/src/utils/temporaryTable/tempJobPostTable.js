//1 first create temporary jobPost model

const { dataModel } = require("../../dbConnection");
const { CustomError } = require("../apiResponse");
const { jobPostSchema } = require("../shcema/jobs.schema");

// creating unique table name
const sequelize = dataModel.sequelize;
const createTableName = (empId) => {
  const time = new Date()
    .toISOString()
    .replace(/[-:T.]/g, "")
    .slice(15, -1);
  return `tempJobs:${empId}-${time}`;
};

const tempJobPostModel = async (empId) => {
  const options = {
    tableName: createTableName(empId),
    timestamps: true,
    paranoid: true,
  };
  const model = sequelize.define("TempJobPostModel", jobPostSchema, options);
  try {
    await model.sync({ force: true });
  } catch (error) {
    throw new CustomError(
      error.message || "unable to Create temporary table",
      500
    );
  }
  return model;
};
module.exports = tempJobPostModel;
