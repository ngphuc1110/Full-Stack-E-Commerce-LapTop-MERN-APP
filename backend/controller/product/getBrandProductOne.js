const productModel = require("../../models/productModel")

const getBrandProduct = async (req, res) => {
    try {
        const productBrand = await productModel.distinct("brandName")


        //array to store one product from each Brand
        const productByBrand = []

        for (const brandName of productBrand) {
            const product = await productModel.findOne({ brandName })

            if (product) {
                productByBrand.push(product)
            }
        }

        res.json({
            message: "Product Brand",
            data: productByBrand,
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

module.exports = getBrandProduct