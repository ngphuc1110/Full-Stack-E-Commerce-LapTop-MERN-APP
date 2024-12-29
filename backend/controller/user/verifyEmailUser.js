const userModel = require("../../models/userModel")

async function verifyEmailUser(req, res) {
    try {
        const { code } = req.body
        console.log("code", code)
        const user = await userModel.findOne({ _id: code })
        if (!user) {
            return res.status(400).json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }
        console.log("user", user)
        const updateUser = await userModel.updateOne({ _id: code }, { verify_email: true, status: "Active" })

        return res.json({
            message: "Verify success",
            error: false,
            success: true
        })
    }
    catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = verifyEmailUser