const productModel = require("../../models/productModel")

const getBrandWiseProduct = async (req, res) => {
    try {
        const { brandName } = req?.body || req.query
        const product = await productModel.find({ brandName })

        res.json({
            data: product,
            message: "product",
            success: true,
            error: false,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getBrandWiseProduct