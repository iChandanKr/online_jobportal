const express=require('express')
const router=express.Router()
const {getAllSkills}=require('./skills.controller')

router.route('/getAllSkills').get(getAllSkills)

module.exports=router;