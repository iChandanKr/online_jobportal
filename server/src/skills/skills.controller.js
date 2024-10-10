const SkillsService=require('./skills.service')
const resObj=require('../utils/response')
const getAllSkills=async(req,res,next)=>{
    try {
        const skills=await SkillsService.getAllSkills()
        resObj(res,200,'Skills Fetched successfully',skills)
    } catch (error) {
        next(error)
    }
}
module.exports={getAllSkills}