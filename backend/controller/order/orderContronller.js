const orderProductModel = require("../../models/orderProductModel")

const orderContronller = async (req, res) => {
    try {
        const currentUserId = req.userId

        const orderList = await orderProductModel.find({ userId: currentUserId }).sort({ createdAt: -1 })

        res.json({
            data: orderList,
            message: "OrderList",
            error: false,
            success: true,
        })

    }
    catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = orderContronller