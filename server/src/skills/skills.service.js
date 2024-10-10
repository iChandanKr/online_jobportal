const {getAllSkillsDB}=require('./skills.repo')

class SkillsService{
    static getAllSkills=async()=>{
        const skills=await getAllSkillsDB()
        return skills
    }
}
module.exports=SkillsService
