import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import acer from '../assest/products/brandLogo/acer.jpg'
import apple from '../assest/products/brandLogo/apple.jpg'
import asus from '../assest/products/brandLogo/asus.jpg'
import dell from '../assest/products/brandLogo/dell.jpg'
import gigabyte from '../assest/products/brandLogo/gigabyte.png'
import hp from '../assest/products/brandLogo/hp.png'
import lenovo from '../assest/products/brandLogo/lenovo.jpg'
import lg from '../assest/products/brandLogo/lg.jpg'
import msi from '../assest/products/brandLogo/msi.jpg'

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

    const brandLogo = [
        acer,
        apple,
        asus,
        dell,
        gigabyte,
        hp,
        lenovo,
        lg,
        msi
    ]

    useEffect(() => {
        fetchBrandProduct()
    }, [])

    return (
        <div className='container mx-auto px-6 py-6'>
            <div className='flex items-center gap-1 justify-between overflow-scroll scrollbar-none'>
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
                                            <img src={brandLogo[index]} alt={product?.brandName} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all ' />
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