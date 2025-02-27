const User =require("./userModel")

const bcrypt=require("bcrypt")
// const Company=require("../company/companyModel")
// changePassword = (req, res) => {
//     var validationerror = []
//     if (!req.body.oldpassword)
//         validationerror.push("Old password is required")
//     if (!req.body.newpassword)
//         validationerror.push("New password is required")
//     if (!req.body.confirmpassword)
//         validationerror.push("Confirm passwrod is required")
//     if (validationerror.length > 0) {
//         res.send(
//             {
//                 status: 422,
//                 success: false,
//                 message: "validation error",
//                 error: validationerror
//             }
//         )
//     }
//     else {
//         var decoded = req["decoded"]
//         User.findOne({ _id: req.body._id })
//             .then(User => {
//                 if (!User) {
//                     res.send({
//                         status: 404,
//                         success: false,
//                         message: "User not found"
//                     })
//                 }
//                 else {
//                     if (req.body.newpassword == req.body.confirmpasssword) {
//                         // compare oldpassword with db password
//                         bcrypt.compare(req.body.oldpassword, User.password, function (err, data) {
//                             if (!data) {
//                                 res.send({
//                                     status: 422,
//                                     success: false,
//                                     message: "Invalid old password"
//                                 })
//                             }
//                             else {
//                                 //update
//                                 User.password = bcrypt.hashSync(req.body.newpassword, saltround)
//                                 User.save()
//                                 res.send({
//                                     status: 200,
//                                     success: true,
//                                     message: "Password updates"
//                                 })
//                             }
//                         })
//                     }

//                 }
//             })
//     }
// }
const changePassword = (req, res) => {
    validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!req.body.currentPassword) {
        validation = "currentPassword is required"
    }
    if (!req.body.newPassword) {
        validation = "newPassword is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: 'Validation Error' + validation
        })
    }
    else {
        User.findOne({ _id: req.body._id })
            .exec()
            .then((userData) => {
                if (userData == null) {  
                    res.send({
                        success: false,
                        status: 500,
                        message: "user not found"

                    })
                }
                else {
                    if (bcrypt.compareSync( req.body.currentPassword, userData.password)) {

                        if (bcrypt.compareSync( req.body.newPassword, userData.password)) {
                            res.send({
                                success: false,
                                status: 400,
                                message: "new password cant be same as old password"
                            })
                        }
                        else {
                            userData.password = bcrypt.hashSync(req.body.newPassword, 10)

                            userData.save()
                                .then((data) => {
                                    res.send({
                                        success: true,
                                        status: 200,
                                        message: "password updated",

                                    })
                                })
                                .catch((err) => {
                                    res.send({
                                        success: false,
                                        status: 400,
                                        message: err.message
                                    })
                                })
                        }
                    }
                    else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Invalid Password"
                        })
                    }
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}
module.exports={
    changePassword
}