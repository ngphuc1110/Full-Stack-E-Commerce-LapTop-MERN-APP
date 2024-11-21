import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const BrandList = () => {

    const [brandProduct, setBrandProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const brandLoading = new Array(13).fill(null)

    const fetchBrandProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productBrand.url)
        const dataResponse = await response.json()
        setLoading(false)
        setBrandProduct(dataResponse.data)

    }

    useEffect(() => {
        fetchBrandProduct()
    }, [])

    return (
        <div className='container mx-auto px-6 py-6'>
            <div className='flex items-center gap-5 justify-between overflow-scroll scrollbar-none'>
                {
                    loading ? (
                        brandLoading.map((el, index) => {
                            return (
                                <div className='w-40 h-40 md:w-40 md:h-40 overflow-hidden bg-slate-200 animate-pulse' key={"brandLoading" + index}>

                                </div>
                            )
                        })
                    ) :
                        (
                            brandProduct.map((product, index) => {
                                return (
                                    <Link to={"category-product/?brand=" + product?.brandName} className='cursor-pointer' key={product?.brandName}>
                                        <div className='w-40 h-40 md:w-40 md:h-40 overflow-hidden p-2 bg-slate-200 flex items-center justify-center'>
                                            <img src={product?.productImage[0]} alt={product?.brandName} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all ' />
                                        </div>
                                        <p className='text-center text-sm md:text-base uppercase '>{product?.brandName}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>

    )
}

export default BrandList