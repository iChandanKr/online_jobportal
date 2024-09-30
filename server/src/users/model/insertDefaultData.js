const insertDefaultRoles = async (Role) => {
  try {
    await Role.bulkCreate([
      { role: "admin" },
      { role: "jobseeker" },
      { role: "employer" },
    ]);
    console.log("Default roles inserted successfully.");
  } catch (error) {
    console.error("Error inserting default roles:", error);
  }
};
module.exports = insertDefaultRoles;
