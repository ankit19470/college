const studentModel=require("../server/student/studentModel");
const companyModel=require("../server/company/companyModel");
const jobModel=require("../server/jobpost/jobModel");
const depModel=require("../server/department/departmentModel");
const courseModel=require("../server/course/courseModel");
const applicationModel=require("../server/application/applicationModel");

const userModel=require("../server/user/userModel");

const adminDash=async(req,res)=>{
    let students=await studentModel.find({status:true}).countDocuments();
    let companies=await companyModel.find({status:true}).countDocuments();
    
    let jobs=await jobModel.find({status:true}).countDocuments();

    let dep=await depModel.find({status:true}).countDocuments();
    let courses=await courseModel.find({status:true}).countDocuments();
    let applications=await applicationModel.find({status:true}).countDocuments();
    
    let activeStudents=await studentModel.find({status:true});
    let activeCompany=await companyModel.find({status:true});
    let activejob=await jobModel.find({status:true});
    let activedep=await depModel.find({status:true});
    let activecourse=await courseModel.find({status:true});
    let activeapplication=await applicationModel.find({status:true});

    let activeUser=await userModel.find({userType:3,status:true});

    res.send({
        status:200,
        success:true,
        message:"Dashboard",
        totalstudent:students,
        totalcompany:companies,
        totaljob:jobs,
        totaldep:dep,
        totalcourse:courses,
        totalapp:applications,
        activeStudents:activeStudents.length,
        activeCompany:activeCompany.length,
        activejob:activejob.length,
        activedep:activedep.length,
        activecourse:activecourse.length,
        activeapplication:activeapplication.length,
        activeUser:activeUser.length,
    })
    
}
module.exports={
    adminDash
}