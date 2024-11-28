const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const { ValidationError, SequelizeDatabaseError } = require("sequelize");
const fs = require("fs");
const csv = require("csv-parser");
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
const { CustomError } = require("../utils/apiResponse");

class JobService {
  static createJobPostService = async (jobpostdata) => {
    const result = await sequelize.transaction(async (t) => {
      return await createJobPostDb(jobpostdata, t);
    });
    return result;
  };

  static getAllJobsService = async (req) => {
    let orderBy;
    let visibleAttributes;
    let searchFields = req.query.search || "%";
    let shift = [];
    const limit = req.query.limit || 5;
    let offset;
    if (req.query.sort) {
      orderBy = sort(req.query.sort);
    } else {
      orderBy = sort("-updatedAt");
    }

    if (req.query.fields) {
      visibleAttributes = limitFields(req.query.fields);
    }

    if (req.query.search) {
      searchFields = search(searchFields);
    }
    if (!req.query.shift) {
      shift = ["morning", "evening"];
    } else {
      shift = [req.query.shift];
    }
    if (req.query.page) {
      offset = paginate(req.query.page, limit);
    }
    const attributes = visibleAttributes
      ? visibleAttributes
      : [
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

  static updateJobService = async (id, updatedData) => {
    return await updateJobDB(id, updatedData);
  };

  static deleteJobService = async (id) => {
    return await deleteJobDB(id);
  };

  static applyJobService = async (userId, jobId) => {
    return await applyForJobDB(userId, jobId);
  };

  static getAllOpenJobService = async (req) => {
    let searchFields = req.query.search || "%";
    if (req.query.search) {
      searchFields = search(searchFields);
    }
    const jobDetails = await getAllOpenJobsDB(searchFields);

    return jobDetails;
  };

  static getJobByIdService = async (id) => {
    return await getJobByIdDB(id);
  };
  static getJobDetailsService = async (id) => {
    const jobDetails = await jobWithSkillDetails(id);
    const skills = jobDetails.Skills.map((skill) => skill.skillName);
    delete jobDetails.dataValues.skillId;
    delete jobDetails.dataValues.Skills;
    const jobWithSkill = { ...jobDetails.dataValues, skills };
    return jobWithSkill;
  };

  static jobsToApplyService = async (req) => {
    let searchFields = req.query.search || "%";
    if (req.query.search) {
      searchFields = search(searchFields);
    }
    return await jobsToApplyDB(req.user.id, searchFields);
  };

  static applicantOfAjobService = async (req) => {
    let orderBy;
    if (req.query.sort) {
      orderBy = sort(req.query.sort);
    } else {
      orderBy = sort("-updatedAt");
    }
    const applicants = await applicantOFaJob(req.params.id, orderBy);
    const clonedRes = JSON.parse(JSON.stringify(applicants.dataValues.Users));
    const modifiedRes = clonedRes.map((user) => {
      const appliedDate = user.Application.updatedAt;
      const applicationStatus = user.Application.status;
      delete user.Application;
      return { ...user, appliedOn: appliedDate, status: applicationStatus };
    });
    return modifiedRes;
  };

  static getAllapplicantService = async (req) => {
    // let orderBy;
    // if (req.query.sort) {
    //   orderBy = sort(req.query.sort);
    // } else {
    //   orderBy = sort("-updatedAt");
    // }
    const applicants = await getAllApplicantsDB(req.empId);
    // console.log(applicants);
    return applicants;
    // const clonedRes = JSON.parse(JSON.stringify(applicants.dataValues.Users));
    // // console.log(clonedRes);
    // const modifiedRes = clonedRes.map((user) => {
    //   const appliedDate = user.Application.updatedAt;
    //   delete user.Application;
    //   return { ...user, appliedOn: appliedDate };
    // });
    // // console.log(modifiedRes);
    // return modifiedRes;
  };

  static updateApplicationStatusService = async (payloads) => {
    const res = await updateApplicationStatusDB(payloads);
    return res;
  };

  static getOpenJobsOfEmployerService = async (empId) => {
    return await getOpenJobsOfEmployer(empId);
  };
  static getClosedJobsOfEmployerService = async (empId) => {
    return await getClosedJobsOfEmployer(empId);
  };
  static getJobPostPerMonthOfEmployerService = async (empId) => {
    const jobs = await getPostedJobsPerMonthOfEmployer(empId);
    const months = jobs.map((job) => job.month);
    const jobCount = jobs.map((job) => job.jobCount);
    return { months, jobCount };
  };
  // eslint-disable-next-line no-unused-vars
  static bulkCreateJobService = async (req, res, next) => {
    const result = [];
    const errorsOccured = [];
    const validRows = [];
    let insertedRows;
    try {
      const rows = await new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on("data", (data) => {
            if (Object.keys(data).length > 0) {
              if (data.skillId.startsWith("[") && data.skillId.endsWith("]")) {
                let temp = data.skillId
                  .substring(1, data.skillId.length - 1)
                  .split(",")
                  .map((id) => `"${id.trim()}"`)
                  .join(",");
                data.skillId = JSON.parse(`[${temp}]`);
              }
              result.push(data);
            }
          })
          .on("end", () => {
            resolve(result);
          })
          .on("error", (err) => {
            reject(err);
          });
      });
      if (rows) {
        const Model = sequelize.models["JobPost"];
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
              throw validationError;
            }
          }
        }
        if (validRows.length > 0) {
          insertedRows = await Model.bulkCreate(validRows, {
            validate: true,
          });
        }
        return {
          success: validRows.length,
          errorsOccured,
          insertedRows,
        };
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "fail",
        message: errorsOccured,
      });
    }
  };
}
module.exports = JobService;
