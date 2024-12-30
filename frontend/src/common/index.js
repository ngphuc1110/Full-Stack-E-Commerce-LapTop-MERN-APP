const backendDomain = process.env.REACT_APP_BACKEND_URL //"http://localhost:8080"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-detail`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/logout`,
        method: "get"
    },
    verify_email: {
        url: `${backendDomain}/api/verify-email`,
        method: "post"
    },
    all_users: {
        url: `${backendDomain}/api/all-users`,
        method: "get"
    },
    update_user: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    remove_user: {
        url: `${backendDomain}/api/remove-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    productBrand: {
        url: `${backendDomain}/api/get-productBrand`,
        method: "get"
    },
    brandWiseProduct: {
        url: `${backendDomain}/api/brand-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCart: {
        url: `${backendDomain}/api/add-to-cart`,
        method: "post"
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/count-add-to-cart-products`,
        method: "get"
    },
    viewCartProduct: {
        url: `${backendDomain}/api/view-cart-products`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-products`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-products`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search-product`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },
    payment: {
        url: `${backendDomain}/api/checkout`,
        method: "post"
    },
    orderList: {
        url: `${backendDomain}/api/order-list`,
        method: "get"
    },
    allOrder: {
        url: `${backendDomain}/api/all-order`,
        method: "get"
    },
    updateOrder: {
        url: `${backendDomain}/api/update-order`,
        method: "post"
    },
}

export default SummaryApi