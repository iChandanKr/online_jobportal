const express=require('express')
const router=express.Router();
const {createJobPost}=require('./jobPost.controller')
const authMiddleware=require('../middleware/auth.middleware')
const checkEmployerRole=require('../middleware/checkEmployerRole.middleware')
const {jobPostValidation}=require('../middleware/joiValidation.middleware')

router.route('/add-jobpost').post(jobPostValidation,authMiddleware,checkEmployerRole,createJobPost)
module.exports=router;