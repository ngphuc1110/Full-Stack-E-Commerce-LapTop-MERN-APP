const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-detail`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/logout`,
        method: "get"
    },
    all_users: {
        url: `${backendDomin}/api/all-users`,
        method: "get"
    },
    update_user: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomin}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: "post"
    },
    productBrand: {
        url: `${backendDomin}/api/get-productBrand`,
        method: "get"
    },
    brandWiseProduct: {
        url: `${backendDomin}/api/brand-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: "post"
    }


}

export default SummaryApi