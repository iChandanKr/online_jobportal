const {dataModel}=require('../dbConnection')
const {Skill}=dataModel

const getAllSkillsDB=async()=>{
    return await Skill.findAll()
}

module.exports={
    getAllSkillsDB
}
