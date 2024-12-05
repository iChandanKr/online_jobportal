const {
  jobPostSchema,
  jobPostModelOptions,
} = require("../utils/shcema/jobs.schema");
module.exports = (sequelize) => {
  const jobpost = sequelize.define(
    "JobPost", // model name
    jobPostSchema,
    jobPostModelOptions
  );
  return jobpost;
};
