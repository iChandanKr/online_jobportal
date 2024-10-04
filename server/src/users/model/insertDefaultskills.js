const insertDefaultSkills = async (Skill) => {
    const skills = [
      { skillName: "JavaScript" },
      { skillName: "Python" },
      { skillName: "Java" },
      { skillName: "C#" },
      { skillName: "Ruby" },
      { skillName: "PHP" },
      { skillName: "Kotlin" },
      { skillName: "SQL" },
      { skillName: "HTML" },
      { skillName: "CSS" },
      { skillName: "React" },
      { skillName: "Angular" },
      { skillName: "Vue.js" },
      { skillName: "Node.js" },
      { skillName: "Django" },
      { skillName: "Flask" },
      { skillName: "Machine Learning" },
      { skillName: "Data Analysis" },
      { skillName: "Financial Analysis" },
      { skillName: "Budgeting" },
      { skillName: "Accounting" },
      { skillName: "Investment Management" },
      { skillName: "Tax Planning" },
      { skillName: "Risk Management" },
      { skillName: "Forecasting" },
      { skillName: "Excel" },
      { skillName: "Recruitment" },
      { skillName: "Employee Relations" },
      { skillName: "Performance Management" },
      { skillName: "Training and Development" },
      { skillName: "HR Policies" },
      { skillName: "Compensation and Benefits" },
      { skillName: "Bookkeeping" },
      { skillName: "Tax Preparation" },
      { skillName: "Audit" },
      { skillName: "Accounts Payable" },
      { skillName: "Accounts Receivable" },
      { skillName: "Six Sigma" },
      { skillName: "Quality Control" },
      { skillName: "Supply Chain Management" },
      { skillName: "Production Planning" },
      { skillName: "Project Management" },
      { skillName: "Blueprint Reading" },
      { skillName: "Safety Management" },
      { skillName: "Cost Estimation" },
      { skillName: "Contract Negotiation" },
      { skillName: "Communication" },
      { skillName: "Problem-Solving" },
      { skillName: "Time Management" },
      { skillName: "Teamwork" },
      { skillName: "Leadership" },
      { skillName: "Critical Thinking" },
      { skillName: "Adaptability" },
    ];
  
    try {
      await Promise.all(skills.map((skill) => Skill.upsert(skill)));
      console.log("Default skills inserted successfully.");
    } catch (error) {
      console.error("Error inserting default skills:", error);
    }
  };
  
  module.exports = insertDefaultSkills;
  