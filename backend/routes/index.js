const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailController = require('../controller/user/userDetail')
const authToken = require('../middleware/authToken')
const userLogOut = require('../controller/user/userLogOut')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getBrandProduct = require('../controller/product/getBrandProductOne')
const getBrandWiseProduct = require('../controller/product/getBrandWiseProduct')
const getProductDetail = require('../controller/product/getProductDetail')

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-detail", authToken, userDetailController)
router.get("/logout", userLogOut)

//admin panel 
router.get("/all-users", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

//product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-productBrand", getBrandProduct)
router.post("/brand-product", getBrandWiseProduct)
router.post("/product-details", getProductDetail)

module.exports = router