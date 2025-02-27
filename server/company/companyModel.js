const mongoose = require("mongoose")
const companySchema = new mongoose.Schema({
    // companyUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'logins', default: null },
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    Description: { type: String, default: null },
    Logo: { type: String, default: 'no_image.jpg'},
    address: { type: String, default: null },
    contact: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
})
module.exports = new mongoose.model("companies", companySchema)