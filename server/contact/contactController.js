const Contact = require("./contactModel")
add = (req, res) => {
    var validationerror = []
    if (!req.body.firstName)
        validationerror.push("firt name is required")
    if (!req.body.lastName)
        validationerror.push("last name is required")
    if (!req.body.email)
        validationerror.push("email is required")
    if (!req.body.address)
        validationerror.push("Address is required")
    if (!req.body.contact)
        validationerror.push("Contact is required")

    if (validationerror.length > 0) {
        res.send({
            status: 422,
            success: false,
            message: "validation errors",
            error: validationerror

        })
    }
    else {
        // duplycacy
        Contact.findOne({ email: req.body.email })
            .then(contactData => {
                if (!contactData) {
                    // new insert
                    let contactObj = new Contact()
                    contactObj.firstName = req.body.firstName
                    contactObj.lastName = req.body.lastName
                    contactObj.email = req.body.email
                    contactObj.address = req.body.address
                    contactObj.contact = req.body.contact
                    contactObj.save()
                        .then(saveRes => {
                            res.send({
                                status: 200,
                                success: true,
                                message: "Record Inserted",
                                data: saveRes
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
                }else{
                    res.send({
                        status:422,
                        success:false,
                        message:"Record already exists",
                        data:contactData
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
getallCon = (req, res) => {
    Contact.find()
        .then(contactData => {
            res.send({
                status: 200,
                success: true,
                message: "Data Loaded",
                data: contactData
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
module.exports={
    add,getallCon
}