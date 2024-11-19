const productModel = require("../../models/productModel")

const getProductDetail = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)

        res.json({
            data: product,
            message: "Ok",
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProductDetail