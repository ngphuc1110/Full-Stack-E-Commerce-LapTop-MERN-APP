const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req, res) {
    try {
        console.log("UserID: ", req.userId)
        const sessionUserId = req.userId
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denined!")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "Upload successfully!",
            error: false,
            success: true,
            data: saveProduct
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

module.exports = UploadProductController