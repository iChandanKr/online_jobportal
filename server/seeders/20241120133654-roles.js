"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
const rolesToInsert = [
  { id: uuidv4(), role: "admin" },
  { id: uuidv4(), role: "jobseeker" },
  { id: uuidv4(), role: "employer" },
];
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("role", rolesToInsert, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("role", null, {});
  },
};
