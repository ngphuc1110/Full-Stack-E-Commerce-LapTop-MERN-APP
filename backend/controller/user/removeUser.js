const userModel = require("../../models/userModel")

async function removeUser(req, res) {
    try {

        const { userId } = req.body

        const removeUser = await userModel.findByIdAndDelete(userId)

        res.json({
            data: removeUser,
            message: "User Delete Successfully!!!",
            error: false,
            success: true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = removeUser