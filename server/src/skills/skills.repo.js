const {dataModel}=require('../dbConnection')
const {Skill}=dataModel

const getAllSkillsDB=async()=>{
    return await Skill.findAll({
        order:[['skillName','ASC']]
    })
}

module.exports={
    getAllSkillsDB
}
