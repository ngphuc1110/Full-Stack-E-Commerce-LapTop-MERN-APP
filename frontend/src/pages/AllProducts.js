import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {

    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        setAllProduct(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])
    return (
        <div className=''>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'> All Products</h2>
                <button className='border-2 border-red-600 py-1 px-3 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
            </div>

            {/**All Product */}
            <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-auto'>
                {
                    allProduct.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchData={fetchAllProduct} />

                        )
                    })
                }
            </div>

            {/**Upload Product */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
                )
            }
        </div>
    )
}

export default AllProducts