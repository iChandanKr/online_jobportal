const fs = require("fs");
const csv = require("csv-parser");
const { CustomError } = require("./apiResponse");

function compareHeaders(expected, actual) {
  const errorOccured = [];
  if (expected.length !== actual.length) {
    throw new CustomError("Actual headers differ from Expected", 400);
  }

  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      errorOccured.push({
        row: 1,
        errors: [`Expected ${expected[i]}, but got ${actual[i]}`],
      });
    }
  }
  if (errorOccured.length > 0) {
    throw new CustomError(errorOccured, 400);
  }
}
module.exports = (req) => {
  return new Promise((resolve, reject) => {
    const readRows = [];
    const EXPECTED_HEADERS = [
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
    const actualHeaders = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("headers", (headerList) => {
        headerList.forEach((header) => actualHeaders.push(header));
        try {
          compareHeaders(EXPECTED_HEADERS, actualHeaders);
        } catch (error) {
          reject(error);
        }
      })
      .on("data", (data) => {
        if (Object.keys(data).length > 0) {
          if (data.skillId?.startsWith("[") && data.skillId?.endsWith("]")) {
            let temp = data.skillId
              .substring(1, data.skillId.length - 1)
              .split(",")
              .map((id) => `"${id.trim()}"`)
              .join(",");
            data.skillId = JSON.parse(`[${temp}]`);
          }
          readRows.push(data);
        }
      })
      .on("end", () => {
        resolve(readRows);
      })
      .on("error", (err) => {
        console.log("error occured", err.message);

        reject(err);
      });
  });
};
