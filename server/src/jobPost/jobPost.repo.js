const {dataModel}=require('../dbConnection')
const {JobPost}=dataModel
const createJobPostDb=async(jobPostData,t)=>{
    console.log(typeof jobPostData.applicationDeadline);
    
    const newJobData= await JobPost.create({
            title: jobPostData.title,
            description: jobPostData.description,
            role: jobPostData.role,
            location: jobPostData.location,
            city: jobPostData.city,
            industryName: jobPostData.industryName,
            empId: jobPostData.empId, 
            skillId: jobPostData.skillId, 
            minSalary:jobPostData.minSalary,
            maxSalary:jobPostData.maxSalary,
            applicationDeadline:jobPostData.applicationDeadline,
            jobType:jobPostData.jobType,
            shift:jobPostData.shift
    },{transaction:t})

    return newJobData
}

module.exports={createJobPostDb}