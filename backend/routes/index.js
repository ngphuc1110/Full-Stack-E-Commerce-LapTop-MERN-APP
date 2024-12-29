const express = require('express')
const router = express.Router()


const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailController = require('../controller/user/userDetail')
const authToken = require('../middleware/authToken')
const userLogOut = require('../controller/user/userLogOut')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const removeUser = require('../controller/user/removeUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getBrandProduct = require('../controller/product/getBrandProductOne')
const getBrandWiseProduct = require('../controller/product/getBrandWiseProduct')
const getProductDetail = require('../controller/product/getProductDetail')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const paymentController = require('../controller/order/paymentController')
const webHooks = require('../controller/order/webhooks')
const orderContronller = require('../controller/order/orderContronller')
const allOrder = require('../controller/order/allOrder')
const updateOrder = require('../controller/order/updateOrder')
const verifyEmailUser = require('../controller/user/verifyEmailUser')

//user
router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.post("/verify-email", verifyEmailUser)
router.get("/user-detail", authToken, userDetailController)
router.get("/logout", userLogOut)

//admin panel 
router.get("/all-users", authToken, allUsers)
router.post("/update-user", authToken, updateUser)
router.post("/remove-user", authToken, removeUser)

//product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-productBrand", getBrandProduct)
router.post("/brand-product", getBrandWiseProduct)
router.post("/product-details", getProductDetail)
router.get("/search-product", searchProduct)
router.post("/filter-product", filterProductController)

//user add to cart
router.post("/add-to-cart", authToken, addToCartController)
router.get("/count-add-to-cart-products", authToken, countAddToCartProduct)
router.get("/view-cart-products", authToken, addToCartViewProduct)
router.post("/update-cart-products", authToken, updateAddToCartProduct)
router.post("/delete-cart-products", authToken, deleteAddToCartProduct)

//payment and order
router.post("/checkout", authToken, paymentController)
router.post("/webhook", webHooks)
router.get("/order-list", authToken, orderContronller)
router.get("/all-order", authToken, allOrder)
router.post("/update-order", authToken, updateOrder)


module.exports = router