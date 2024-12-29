const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    address: String,
    phone: String,
    profilePic: String,
    role: String,
    verify_email: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Inactive"
    },
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: ""
    }
}, {
    timestamps: true
})


const userModel = mongoose.model("user", userSchema)


module.exports = userModel