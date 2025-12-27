require("dotenv").config({ path: "../src/config.env" });

module.exports = {
  development: {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_MIGRATION,
    username: "postgres",
    password: "password",
    database: "migration",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
    migrations: ["./database/migrations/*.js"],  // Pointing to the new location
    seeders: ["./database/seeders/*.js"],
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MIGRATION,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
    migrations: ["./database/migrations/*.js"],  // Pointing to the new location
    seeders: ["./database/seeders/*.js"],
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MIGRATION,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
    migrations: ["./database/migrations/*.js"],  // Pointing to the new location
    seeders: ["./database/seeders/*.js"],
  },
};
