const orderProductModel = require("../../models/orderProductModel")

const updateOrder = async (req, res) => {
    try {
        const { orderId, orderStatus, phone, address } = req.body
        const payload = {
            ...(address && { address: address }),
            ...(phone && { phone: phone }),
            ...(orderStatus && { orderStatus: orderStatus }),
        }
        const updateOrder = await orderProductModel.findByIdAndUpdate(orderId, payload)

        res.json({
            data: updateOrder,
            message: "updateOrder",
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

module.exports = updateOrder