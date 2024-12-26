const userModel = require("../../models/userModel")

async function updateUser(req, res) {
    try {

        const sessionUser = req.userId

        const { userId, name, email, role, address } = req.body
        const payload = {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(address && { address: address }),
            ...(role && { role: role }),
        }

        const user = await userModel.findById(sessionUser)
        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: updateUser,
            message: "User Update Successfully!!!",
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

module.exports = updateUser

