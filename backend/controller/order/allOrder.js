const orderProductModel = require("../../models/orderProductModel")

async function allOrder(req, res) {
    try {

        const allOrders = await orderProductModel.find().sort({ createdAt: -1 })

        res.json({
            message: "All Order",
            data: allOrders,
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
module.exports = allOrder