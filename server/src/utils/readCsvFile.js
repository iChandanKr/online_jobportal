const fs = require("fs");
const csv = require("csv-parser");
module.exports = (req) => {
  return new Promise((resolve, reject) => {
    const readRows = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
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
        reject(err);
      });
  });
};
