const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    productDetails: {
        type: Array,
        default: [],
    },
    email: {
        type: String,
        defaut: ""
    },
    address: {
        type: String,
        defaut: ""
    },
    phone: {
        type: String,
        defaut: ""
    },
    userId: {
        type: String,
        default: ""
    },
    paymentDetails: {
        paymentId: {
            type: String,
            defaut: ""
        },
        payment_method_types: [],
        payment_status: {
            type: String,
            default: "",
        }
    },
    shipping_options: [],
    totalAmount: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
})
const orderProductModel = mongoose.model('order', orderSchema)

module.exports = orderProductModel