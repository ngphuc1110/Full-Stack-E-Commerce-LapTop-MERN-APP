import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchBrandWiseProduct from '../helper/fetchBrandWiseProduct'
import currencyFormat from '../helper/currencyFormat'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context';
import scrollTop from '../helper/scrollTop';

const HorizontalCardProduct = ({ brandName, heading }) => {
    const [brandProduct, setBrandProduct] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const brandProduct = await fetchBrandWiseProduct(brandName)
        const response = await fetch(SummaryApi.productBrand.url)
        const dataResponse = await response.json()
        setLoading(false)
        setBrandProduct(dataResponse.data)

        setData(brandProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 374
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 374
    }

    return (
        <div className='container mx-auto px-6 my-4 relative'>
            <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[320px] md:min-w-[350px] max-w-[320px] md:max-w-[350px] h-40 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-300 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                                    </div>
                                    <div className='p-2 grid w-full gap-2'>
                                        <h2 className='font-semibold text-sm md:text-sm text-ellipsis line-clamp-2 text-black bg-slate-200 animate-pulse'>{product?.productName}</h2>
                                        <div className='flex gap-3 w-full'>
                                            <p className='text-slate-400 line-through p-1 bg-slate-200 w-full animate-pulse'></p>
                                            <p className='text-blue-700 font-medium p-1 bg-slate-200 w-full animate-pulse'></p>
                                        </div>
                                        <button className=' text-white rounded-full px-2 text-sm py-0.5 w-full bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        brandProduct.map((product, index) => {
                            return (
                                <Link to={"/product/" + product?._id} className='w-full min-w-[320px] md:min-w-[350px] max-w-[320px] md:max-w-[350px] h-40 bg-white rounded-sm shadow flex ' onClick={scrollTop}>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                        <img src={product.productImage[0]} className='object-scale-down h-full mix-blend-multiply hover:scale-125 transition-all' />
                                    </div>
                                    <div className='p-2 grid'>
                                        <h2 className='font-semibold text-sm md:text-sm text-ellipsis line-clamp-2 text-black'>{product?.productName}</h2>
                                        <div className='py-2'>
                                            <p className='text-slate-400 line-through'>{currencyFormat(product?.price)}</p>
                                            <p className='text-blue-700 font-medium'>{currencyFormat(product?.sellingPrice)}</p>
                                        </div>
                                        <button className='bg-red-500 hover:bg-red-700 text-white rounded-full px-2 text-sm py-0.5' onClick={(e) => handleAddToCart(e, product?._id)}>Add to cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )

                }
            </div>

        </div>
    )
}

export default HorizontalCardProduct