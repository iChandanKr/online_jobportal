"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const getHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
getHashedPassword("password");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insertedUser = await queryInterface.bulkInsert(
      "user",
      [
        {
          id: uuidv4(),
          firstName: "Travish",
          lastName: "Head",
          email: "travish@gmail.com",
          password: await getHashedPassword("password"),
          dob: "1990-01-01",
          contact: "7896541230",
          city: "Gandhi Nagar",
          pinCode: "382016",
          state: "Gujarat",
          country: "India",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    );
    const adminRole = await queryInterface.sequelize.query(
      `SELECT id FROM "role" WHERE role = 'admin'`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (adminRole.length > 0) {
      await queryInterface.bulkInsert(
        "userRole",
        [
          {
            UserId: insertedUser[0].id,
            RoleId: adminRole[0].id,
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface) {
    // await queryInterface.bulkDelete(
    //   "userRole",
    //   {
    //     "$user.email$": "johndoe@example.com",
    //   },
    //   {}
    // );

    // Remove the user
    await queryInterface.bulkDelete(
      "user",
      {
        email: "travish@gmail.com",
      },
      {}
    );
  },
};
