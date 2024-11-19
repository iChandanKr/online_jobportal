const env = require("dotenv");
env.config({ path: "./config.env" });
const app = require("./app");
const { dbConnection, redisConnection } = require("./dbConnection");

const port = process.env.BACKEND_PORT || 8000;
dbConnection();
redisConnection();
app.listen(port, () => {
  console.log(`server is listening on port ${port} `);
});
