import React, { useContext } from 'react'
import scrollTop from '../helper/scrollTop'
import currencyFormat from '../helper/currencyFormat'
import Context from '../context'
import addToCart from '../helper/addToCart'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";

const RecommendProduct = ({ loading, data = [], bestProductId }) => {
    const loadingList = new Array(13).fill(null)
    console.log("productId", bestProductId)
    console.log("data", data)
    const { fetchUserAddToCart } = useContext(Context)
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(270px,330px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all' >
            {
                loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[320px] md:min-w-[350px] max-w-[320px] md:max-w-[350px] bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-60 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse'>

                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-semibold text-sm md:text-sm text-ellipsis line-clamp-1 text-black text-center bg-slate-200 animate-pulse p-1'>{product?.productName}</h2>
                                    <div className='flex justify-between mx-5'>
                                        <div className='py-2'>
                                            <p className='text-slate-400 line-through p-1 bg-slate-200 w-24 rounded-full animate-pulse'></p>
                                            <p className='text-slate-400 line-through p-1 bg-white w-10 rounded-full'></p>
                                            <p className='text-blue-700 font-medium p-1 bg-slate-200 w-24 rounded-full animate-pulse'></p>
                                        </div>
                                        <button className=' text-white rounded-full px-5 text-sm py-1 bg-slate-200 w-24 animate-pulse'></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (

                    data.map((product, index) => {
                        return (
                            <div
                                className={`w-full min-w-[320px] md:min-w-[330px] max-w-[320px] md:max-w-[350px] bg-white rounded-sm shadow ${product?._id === bestProductId ? 'border-4 border-red-500' : ''
                                    }`}
                                onClick={scrollTop}
                                key={product?._id}
                            >
                                <Link
                                    to={"/product/" + product?._id}
                                    className="bg-slate-200 h-60 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center"
                                >
                                    <img
                                        src={product.productImage[0]}
                                        className="object-scale-down h-full mix-blend-multiply hover:scale-105 transition-all"
                                    />
                                </Link>
                                <div className="p-4 grid gap-3">
                                    <h2 className="font-semibold text-sm md:text-sm text-ellipsis line-clamp-2 text-black text-center min-h-10">
                                        {product?.productName}
                                    </h2>
                                    <div className='ml-auto rounded-full text-sm bg-red-500 p-2 mr-2 text-white flex justify-center items-center gap-1'>
                                        <p >{product?.score} </p>
                                        <FaStar />
                                    </div>

                                    <div className="flex justify-between mx-5">
                                        <div className="py-2">
                                            <p className="text-slate-400 line-through">{currencyFormat(product?.price)}</p>
                                            <p className="text-blue-700 font-medium">{currencyFormat(product?.sellingPrice)}</p>
                                        </div>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white rounded-full px-5 text-sm py-1"
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )

            }
        </div>

    )
}

export default RecommendProduct