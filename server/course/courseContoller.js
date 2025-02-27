const Course = require("./courseModel")
add = (req, res) => {
    var validationerror = []
    if (!req.body.deptId)
        validationerror.push("department Id is required")
    if (!req.body.courseName)
        validationerror.push("course name is required")
    if (!req.body.courseCode)
        validationerror.push("course code is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        Course.findOne({ courseCode: req.body.courseCode })
            .then(courseData => {
                if (!courseData) {

                    let courseObj = new Course
                    courseObj.deptId = req.body.deptId
                    courseObj.courseName = req.body.courseName
                    courseObj.courseCode = req.body.courseCode
                    courseObj.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "insert successfully",
                                data: saveRes
                            })
                        })
                        .catch(err => {
                            res.send({
                                status: 500,
                                success: false,
                                message: "Internal server",
                                error: err.message
                            })
                        })
                }
                else {
                    // duplycacy
                    res.send({
                        status: 420,
                        success: false,
                        message: "Record is already exists",
                        data: courseData
                    })
                }
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
}
getall = (req, res) => {
    Course.find(req.body)
    .populate("deptId")
        .then(courseData => {
            res.send({
                status: 200,
                success: true,
                message: "data Loaded",
                data: courseData
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
getsingle = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        Course.findOne({ _id: req.body._id })
           .populate("deptId")
            .then(courseData => {
                res.send({
                    status: 200,
                    success: true,
                    message: "Data Found",
                    error: courseData
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
}
deletedata = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        // delete

        Course.deleteOne({ _id: req.body._id })
            .then(coursetData => {
                res.send({
                    status: 200,
                    success: true,
                    message: "Course deleted",
                    data: coursetData
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
}
updatedata = (req, res) => {
    var validationerror = []
    if (!req.body._id)
        validationerror.push("id is required")
    if (validationerror.length > 0) {
        res.send({
            status: 404,
            success: false,
            message: "validation error",
            error: validationerror
        })
    }
    else {
        //update
        Course.findOne({ _id: req.body._id })
            .then(courseData => {
                if (!courseData) {
                    res.send({
                        status: 404,
                        success: "false",
                        message: "Data not found",

                    })
                }
                else {
                    if (req.body.courseName)
                        courseData.courseName = req.body.courseName
                    if (req.body.courseCode)
                        courseData.courseCode = req.body.courseCode
                    if (req.body.deptId)
                        courseData.deptId = req.body.deptId
                    courseData.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Record is updated",
                                data: saveRes
                            })
                        })
                }

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
}
module.exports = {
    add, getall, getsingle, deletedata, updatedata
}