const insertDefaultRoles = async (Role) => {
  const roles = [
    { role: "admin" },
    { role: "jobseeker" },
    { role: "employer" },
  ];
  try {
    // upsert accept object 
    await Promise.all(roles.map((role) => Role.upsert(role)));
    console.log("Default roles inserted successfully.");
  } catch (error) {
    console.error("Error inserting default roles:", error);
  }
};
module.exports = insertDefaultRoles;
