const { dataModel } = require("../dbConnection");
const { sequelize } = dataModel;
const CustomError = require('../utils/customError');
const {createJobPostDb}=require('./jobPost.repo')

class JobPostService{
    static createJobPostService=async(jobpostdata)=>{
        let result;
        try {
            result=await sequelize.transaction(async (t)=>{
                return await createJobPostDb(jobpostdata,t)
                
            });
        } catch (error) {
            throw new CustomError(error.message,500)
        }
        return result
    }
}
module.exports=JobPostService