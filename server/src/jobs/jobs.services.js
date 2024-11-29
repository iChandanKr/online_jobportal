const fs = require("fs");
const { parse } = require("csv-parse");
const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;

const {
  createJobPostDb,
  getAllJobsDB,
  deleteJobDB,
  updateJobDB,
  applyForJobDB,
  getAllOpenJobsDB,
  getJobByIdDB,
  jobWithSkillDetails,
  jobsToApplyDB,
  applicantOFaJob,
  getAllApplicantsDB,
  updateApplicationStatusDB,
  getOpenJobsOfEmployer,
  getClosedJobsOfEmployer,
  getPostedJobsPerMonthOfEmployer,
} = require("./jobs.repo");

const { sort, limitFields, search, paginate } = require("../utils/apiFeatures");
const { CustomError, respondOk } = require("../utils/apiResponse");

class JobService {
  static EXPECTED_HEADERS = [
    "title",
    "description",
    "role",
    "location",
    "city",
    "companyName",
    "industryName",
    "skillId",
    "minSalary",
    "maxSalary",
    "applicationDeadline",
    "jobType",
    "shift",
  ];

  static createJobPostService = async (jobpostdata) => {
    const result = await sequelize.transaction(async (t) => {
      return await createJobPostDb(jobpostdata, t);
    });
    return result;
  };

  static getAllJobsService = async (req) => {
    let orderBy = req.query.sort ? sort(req.query.sort) : sort("-updatedAt");
    let visibleAttributes = req.query.fields
      ? limitFields(req.query.fields)
      : null;
    let searchFields = req.query.search ? search(req.query.search) : "%";
    let shift = req.query.shift ? [req.query.shift] : ["morning", "evening"];
    const limit = req.query.limit || 5;
    const offset = req.query.page ? paginate(req.query.page, limit) : 0;

    const attributes = visibleAttributes || [
      "id",
      "title",
      "description",
      "role",
      "location",
      "city",
      "industryName",
      "skillId",
      "minSalary",
      "maxSalary",
      "applicationDeadline",
      "jobType",
      "shift",
      "companyName",
    ];

    const jobs = await getAllJobsDB(
      req.empId,
      orderBy,
      attributes,
      searchFields,
      shift,
      limit,
      offset
    );
    return jobs;
  };

  static updateJobService = async (id, updatedData) =>
    await updateJobDB(id, updatedData);
  static deleteJobService = async (id) => await deleteJobDB(id);
  static applyJobService = async (userId, jobId) =>
    await applyForJobDB(userId, jobId);

  static getAllOpenJobService = async (req) => {
    const searchFields = req.query.search ? search(req.query.search) : "%";
    return await getAllOpenJobsDB(searchFields);
  };

  static getJobByIdService = async (id) => await getJobByIdDB(id);

  static getJobDetailsService = async (id) => {
    const jobDetails = await jobWithSkillDetails(id);
    const skills = jobDetails.Skills.map((skill) => skill.skillName);
    return {
      ...jobDetails.dataValues,
      skills,
      skillId: undefined,
      Skills: undefined,
    };
  };

  static jobsToApplyService = async (req) => {
    const searchFields = req.query.search ? search(req.query.search) : "%";
    return await jobsToApplyDB(req.user.id, searchFields);
  };

  static applicantOfAjobService = async (req) => {
    const orderBy = req.query.sort ? sort(req.query.sort) : sort("-updatedAt");
    const applicants = await applicantOFaJob(req.params.id, orderBy);

    return applicants.dataValues.Users.map((user) => {
      const appliedDate = user.Application.updatedAt;
      const applicationStatus = user.Application.status;
      delete user.Application;
      return { ...user, appliedOn: appliedDate, status: applicationStatus };
    });
  };

  static getAllapplicantService = async (req) =>
    await getAllApplicantsDB(req.empId);

  static updateApplicationStatusService = async (payloads) =>
    await updateApplicationStatusDB(payloads);
  static getOpenJobsOfEmployerService = async (empId) =>
    await getOpenJobsOfEmployer(empId);
  static getClosedJobsOfEmployerService = async (empId) =>
    await getClosedJobsOfEmployer(empId);

  static getJobPostPerMonthOfEmployerService = async (empId) => {
    const jobs = await getPostedJobsPerMonthOfEmployer(empId);
    const months = jobs.map((job) => job.month);
    const jobCount = jobs.map((job) => job.jobCount);
    return { months, jobCount };
  };

  static bulkCreateJobService = async (req) => {
    const errors = [];
    let isFirstRow = true;
    let success = true;

    return new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(parse({ delimiter: ",", from_line: 1 }))
        .on("data", (row) => {
          try {
            if (isFirstRow) {
              const { isValid, errors: headerErrors } =
                JobService.validateFirstRow(row);
              if (!isValid) {
                success = false;
                headerErrors.forEach((err) => {
                  console.log(err);

                  errors.push(err);
                });
                isFirstRow = false;
                throw new CustomError("Invalid CSV headers", 400);
              }
              console.log("CSV headers validated successfully.");
              isFirstRow = false;
              return;
            }

            // Process data rows
            // console.log("Data row:", row);
          } catch (error) {
            console.error("Error processing data row:", error.message);
            errors.push(error.message);
            success = false;
          }
        })
        .on("error", (error) => {
          console.error("Error during CSV parsing:", error.message);
          errors.push(`CSV Parsing Error: ${error.message}`);
          success = false;
        })
        .on("end", () => {
          if (errors.length > 0) {
            resolve({ success: false, errors });
          } else {
            resolve({ success: true });
          }
        });
    });
  };

  static validateFirstRow = (row) => {
    const errors = [];

    row.forEach((column, index) => {
      if (column.trim() !== JobService.EXPECTED_HEADERS[index]) {
        errors.push(
          `Expected "${
            JobService.EXPECTED_HEADERS[index]
          }", but found "${column.trim()}"`
        );
      }
    });

    return {
      isValid:
        errors.length === 0 &&
        row.length === JobService.EXPECTED_HEADERS.length,
      errors,
    };
  };
}
module.exports = JobService;
