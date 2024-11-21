const productModel = require("../../models/productModel")

const filterProductController = async (req, res) => {
    try {
        const brandNameList = req?.body?.brandName || []
        console.log("brandNameList", brandNameList)

        const product = await productModel.find({
            brandName: {
                "$in": brandNameList
            }
        })

        console.log("product", product)
        res.json({
            data: product,
            message: "product",
            success: true,
            error: false,

        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = filterProductController