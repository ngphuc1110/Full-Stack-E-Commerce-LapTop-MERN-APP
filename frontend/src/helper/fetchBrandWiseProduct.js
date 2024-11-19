const { default: SummaryApi } = require("../common")

const fetchBrandWiseProduct = async (brandName) => {
    const response = await fetch(SummaryApi.brandWiseProduct.url, {
        method: SummaryApi.brandWiseProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            brandName: brandName
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchBrandWiseProduct
