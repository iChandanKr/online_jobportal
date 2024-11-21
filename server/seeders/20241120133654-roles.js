"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
const rolesToInsert = [
  { id: uuidv4(), role: "admin", createdAt: new Date(), updatedAt: new Date() },
  {
    id: uuidv4(),
    role: "jobseeker",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    role: "employer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("role", rolesToInsert, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("role", null, {});
  },
};
