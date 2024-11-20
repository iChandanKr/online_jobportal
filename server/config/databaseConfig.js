require("dotenv").config({ path: "../src/config.env" });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MIGRATION,
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MIGRATION,
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MIGRATION,
    host: "localhost",
    dialect: "postgres",
    logging: false,
  },
};
