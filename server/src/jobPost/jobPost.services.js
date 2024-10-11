const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const CustomError = require('../utils/customError');
const {createJobPostDb,getJobsByEmpId}=require('./jobPost.repo')

class JobPostService{
    static createJobPostService=async(jobpostdata)=>{
        let result;
        try {
            result=await sequelize.transaction(async (t)=>{
                return await createJobPostDb(jobpostdata,t)
                
            });
        } catch (error) {
            throw new CustomError(error,500)
        }
        return result
    }

    static getJobsByEmpId=async(empId)=>{
        try {
            return await getJobsByEmpId(empId)
        } catch (error) {
            throw new Error('Error fetching jobs by employer ID',error)
        }
    }
}
module.exports=JobPostService