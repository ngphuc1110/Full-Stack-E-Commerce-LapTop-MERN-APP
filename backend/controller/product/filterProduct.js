const productModel = require("../../models/productModel")

const filterProductController = async (req, res) => {
    try {

        const brandNameList = req?.body?.brandName || []
        console.log("brandNameList", brandNameList)
        const chipSetList = req?.body?.chipSet || []
        console.log("chipSetList", chipSetList)
        const GPUList = req?.body?.gpu || []
        console.log("GPUList", GPUList)

        const query = {};
        if (brandNameList.length > 0) {
            query.brandName = { $in: brandNameList };
        }
        if (chipSetList.length > 0) {
            query.chipSet = { $in: chipSetList };
        }
        if (GPUList.length > 0) {
            query.gpu = { $in: GPUList };
        }

        const product = await productModel.find(query)

        // brandName: {
        //     "$in": brandNameList
        // }
        console.log(product)

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