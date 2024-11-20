"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "role",
      [{ role: "admin" }, { role: "jobseeker" }, { role: "employer" }],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("role", null, {});
  },
};
