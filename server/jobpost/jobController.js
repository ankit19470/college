const Jobpost=require("./jobModel")
jobadd=(req,res)=>{
    var validationerror=[]
    if(!req.body.Title)
    validationerror.push("Title is required")
    if(!req.body.companyId)
    validationerror.push("companyId is required")
    if(!req.body.Description)
    validationerror.push("Description is required")
    if(!req.body.Salary)
    validationerror.push("Salary is required")
    if(!req.body.Experience)
    validationerror.push("Experience is required")
if(validationerror.length>0){
    res.send({
        status:420,
        success:false,
        message:"validation error",
        error:validationerror
    })
}
else{
    Jobpost.findOne({Title:req.body.Title})
    .then(jobData=>{
        if(!jobData){
            let jobObj=new Jobpost()
            jobObj.Title=req.body.Title
            jobObj.companyId=req.body.companyId
            jobObj.Description=req.body.Description
            jobObj.Salary=req.body.Salary
            jobObj.Experience=req.body.Experience
            jobObj.save()
            .then(saveRes=>{
                res.send({
                    status: 200,
                    success: true,
                    message: "New Jobpost Inserted",
                    data: saveRes
                })
            })
            .catch(err=>{
                res.send({
                    status: 500,
                    success: false,
                    messeage: "Internal server error",
                    error: err.messeage
                })
            })
        }
        else{
            // duplycacy
            res.send({
                status: 500,
                success: false,
                messeage: "Record is already exists",
                data:jobData
            })
        }
    })
    .catch(err=>{
        res.send({
            status: 500,
            success: false,
            messeage: "Internal server error",
            error: err.messeage
        })
    })
}
}
jobgetall = (req, res) => {
    Jobpost.find(req.body)
    .populate("companyId")
        .then(jobData => {
            res.send({
                status: 200,
                success: true,
                message: "Data Loaded",
                data: jobData
            })
        })
        .catch(err => {
            res.send({
                status: 500,
                success: false,
                message: "Internal server error",
                error: err.message
            })
        })
}
jobgetsingle = (req, res) => {
    var validationerrors = []
    if (!req.body._id)
        validationerrors.push("Id is required")
    if (validationerrors.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: "Validation errors",
            error: validationerrors
        })
    }
    else {
        Jobpost.findOne({ _id: req.body._id })
        .populate("companyId")
            .then(jobData => {
                if (!jobData) {
                    res.send({
                        status: 404,
                        success: false,
                        messeage: "Data not loaded",
                        data: jobData
                    })
                }
                else {
                    res.send({
                        status: 200,
                        success: true,
                        messeage: "Data loaded",
                        data: jobData
                    })
                }
            })
            .catch(err => {
                res.send({
                    status: 500,
                    success: false,
                    messeage: "Internal server error",
                    error: err.message
                })
            })
    }




}
jobgetdelete = (req, res) => {
    var validationerrors = []
    if (!req.body._id)
        validationerrors.push("Id is required")
    if (validationerrors.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: "Validation errors",
            error: validationerrors
        })
    }
    else {
        Jobpost.findOne({ _id: req.body._id })
            .then(jobData => {
                if (!jobData) {
                    res.send({
                        status: 404,
                        success: false,
                        messeage: "Data not loaded",
                        data: jobData
                    })
                }
                else {
                    // Jobpost.deleteOne({ _id: req.body._id })
                    // if(req.body.status){
                     jobData.status=req.body.status
                    // }
                    jobData.save()
                    .then(()=>{
                        res.send({
                            status: 200,
                            success: true,
                            message: "status is Update",
                            data: jobData
                        })                      
                    })           
                }
            })
            .catch(err => {
                res.send({
                    status: 500,
                    success: false,
                    messeage: "Internal server error",
                    error: err.message
                })
            })
    }
}
jobupdate = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 402,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        Jobpost.findOne({ _id: req.body._id })
            .then(jobData => {
                if (!jobData) {
                    res.send({
                        status: 404,
                        success: "false",
                        message: "Data not found",
                    })
                }
                else {
                    if (req.body.Title)
                        jobData.Title = req.body.Title
                    if (req.body.companyId)
                        jobData.companyId = req.body.companyId
                    if (req.body.Description)
                        jobData.Description = req.body.Description
                    if (req.body.Salary)
                        jobData.Salary = req.body.Salary
                    if (req.body.Experience)
                        jobData.Experience = req.body.Experience
                    jobData.save()
                    .then(saveRes=>{
                        res.send({
                            status:200,
                            success:true,
                            message:"record is updated",
                            data:saveRes
                        })
                    })
                }
            })
            .catch(err=>{
                res.send({
                    status:500,
                    success:false,
                    message:"internal server error",
                    error:err.message
                })
            })
            
    }
}
module.exports={
    jobadd,jobgetall,jobgetsingle,jobgetdelete,jobupdate
}