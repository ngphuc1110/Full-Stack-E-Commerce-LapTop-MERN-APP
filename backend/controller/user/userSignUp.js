const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const sendEmail = require('../../config/sendEmail');
const verifyEmailTemplate = require('../../ultis/verifyEmailTemplate');

async function userSignUpController(req, res) {
    try {
        const { email, password, name, address, phone, profilePic } = req.body

        const user = await userModel.findOne({ email })

        console.log("user", user)

        if (user) {
            throw new Error("Already user exits.")
        }
        if (!email) {
            throw new Error("Please provide Email")
        }
        if (!password) {
            throw new Error("Please provide Password")
        }
        if (!name) {
            throw new Error("Please provide Name")
        }
        if (!address) {
            throw new Error("Please provide Address")
        }
        if (!phone) {
            throw new Error("Please provide Phone Number")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);


        if (!hashPassword) {
            throw new Error("Something when wrong!")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${saveUser._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify Email from LaptopStore",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })


        return res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully!"
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController