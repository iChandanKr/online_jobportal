const insertDefaultRoles = async (Role) => {
  const roles = [
    { role: "admin" },
    { role: "jobseeker" },
    { role: "employer" },
  ];
  try {
    // upsert accept object
    await Promise.all(
      roles.map((r) =>
        Role.findOrCreate({
          where: { role: r.role },
          default: { r },
        })
      )
    );
    console.log("Default roles inserted successfully.");
  } catch (error) {
    console.error("Error inserting default roles:", error);
  }
};
module.exports = insertDefaultRoles;
