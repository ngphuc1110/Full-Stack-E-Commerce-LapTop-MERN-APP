const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    productImage: [],
    chipSet: String,
    gpu: String,
    ram: String,
    screen: String,
    storage: String,
    description: String,
    price: Number,
    sellingPrice: Number,
    weight: String,
    battery: String,
    os: String
}, {
    timestamps: true
})

const productModel = mongoose.model("products", productSchema)

module.exports = productModel