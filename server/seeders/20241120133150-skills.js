"use strict";
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
const skillsToInsert = [
  { id: uuidv4(), skillName: "JavaScript" },
  { id: uuidv4(), skillName: "Python" },
  { id: uuidv4(), skillName: "Java" },
  { id: uuidv4(), skillName: "C#" },
  { id: uuidv4(), skillName: "Ruby" },
  { id: uuidv4(), skillName: "PHP" },
  { id: uuidv4(), skillName: "Kotlin" },
  { id: uuidv4(), skillName: "SQL" },
  { id: uuidv4(), skillName: "HTML" },
  { id: uuidv4(), skillName: "CSS" },
  { id: uuidv4(), skillName: "React" },
  { id: uuidv4(), skillName: "Angular" },
  { id: uuidv4(), skillName: "Vue.js" },
  { id: uuidv4(), skillName: "Node.js" },
  { id: uuidv4(), skillName: "Django" },
  { id: uuidv4(), skillName: "Flask" },
  { id: uuidv4(), skillName: "Machine Learning" },
  { id: uuidv4(), skillName: "Data Analysis" },
  { id: uuidv4(), skillName: "Financial Analysis" },
  { id: uuidv4(), skillName: "Budgeting" },
  { id: uuidv4(), skillName: "Accounting" },
  { id: uuidv4(), skillName: "Investment Management" },
  { id: uuidv4(), skillName: "Tax Planning" },
  { id: uuidv4(), skillName: "Risk Management" },
  { id: uuidv4(), skillName: "Forecasting" },
  { id: uuidv4(), skillName: "Excel" },
  { id: uuidv4(), skillName: "Recruitment" },
  { id: uuidv4(), skillName: "Employee Relations" },
  { id: uuidv4(), skillName: "Performance Management" },
  { id: uuidv4(), skillName: "Training and Development" },
  { id: uuidv4(), skillName: "HR Policies" },
  { id: uuidv4(), skillName: "Compensation and Benefits" },
  { id: uuidv4(), skillName: "Bookkeeping" },
  { id: uuidv4(), skillName: "Tax Preparation" },
  { id: uuidv4(), skillName: "Audit" },
  { id: uuidv4(), skillName: "Accounts Payable" },
  { id: uuidv4(), skillName: "Accounts Receivable" },
  { id: uuidv4(), skillName: "Six Sigma" },
  { id: uuidv4(), skillName: "Quality Control" },
  { id: uuidv4(), skillName: "Supply Chain Management" },
  { id: uuidv4(), skillName: "Production Planning" },
  { id: uuidv4(), skillName: "Project Management" },
  { id: uuidv4(), skillName: "Blueprint Reading" },
  { id: uuidv4(), skillName: "Safety Management" },
  { id: uuidv4(), skillName: "Cost Estimation" },
  { id: uuidv4(), skillName: "Contract Negotiation" },
  { id: uuidv4(), skillName: "Communication" },
  { id: uuidv4(), skillName: "Problem-Solving" },
  { id: uuidv4(), skillName: "Time Management" },
  { id: uuidv4(), skillName: "Teamwork" },
  { id: uuidv4(), skillName: "Leadership" },
  { id: uuidv4(), skillName: "Critical Thinking" },
  { id: uuidv4(), skillName: "Adaptability" }
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("skills", skillsToInsert, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("skills", null, {});
  },
};
