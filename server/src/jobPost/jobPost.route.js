const express=require('express')
const router=express.Router();
const {createJobPost}=require('./jobPost.controller')

router.route('/add-jobpost').post(createJobPost)

module.exports=router;