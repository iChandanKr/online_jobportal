// const env = require("dotenv");
// env.config({ path: __dirname + "./config.env" });
require("dotenv").config({
  path: require("path").resolve(__dirname, "config.env"),
});

const app = require("./app");
const { dbConnection, redisConnection } = require("./dbConnection");

console.log(process.env.BACKEND_PORT);

const port = process.env.BACKEND_PORT || 8000;
dbConnection();
redisConnection();
app.listen(port, () => {
  console.log(`server is listening on port ${port} `);
});
