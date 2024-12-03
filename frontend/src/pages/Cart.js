import React, { useContext, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import SummaryApi from '../common'
import Context from '../context'
import currencyFormat from '../helper/currencyFormat'
import { MdDelete } from "react-icons/md";

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
    const fetchData = async () => {

        const response = await fetch(SummaryApi.viewCartProduct.url, {
            method: SummaryApi.viewCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
        })
        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }

    }
    console.log("Cart", data)

    const handleLoading = async () => {
        await fetchData()
    }
    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const increaseQuantity = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1,
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decreaseQuantity = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1,
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const handlePayment = async () => {

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ cartItems: data })
        })
        const responseData = await response.json()


        console.log("responseData.id", responseData.id)
        if (responseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: responseData.id })
        }
        console.log("Payment Response: ", responseData)
    }

    const totalQuantity = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr.productId.sellingPrice), 0)
    return (
        <div className='container mx-auto min-h-[570px]'>
            <div className='text-center text-lg py-2 my-3 '>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-7 '>No Product In Cart</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 justify-between'>
                {/* View products in cart */}
                <div className='w-full max-w-4xl px-6'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => {
                                return (
                                    <div key={el + "Add to cart Loading" + index} className='w-full bg-slate-300 h-32 border border-slate-300 animate-pulse rounded grid grid-cols-[128px,1fr] my-3 mx-8 '></div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add to cart Loading"} className='w-full bg-white h-32 border border-slate-300 rounded grid grid-cols-[128px,1fr] my-3 mx-8 '>
                                        <div className='w-28 h-28'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='p-2 relative'>
                                            {/* Delete Product */}
                                            <div className='absolute right-2 p-2 text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white' onClick={() => deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <h3 className=' uppercase text-slate-500'>{product?.productId?.brandName}</h3>
                                            <div className='flex justify-between items-center text-lg'>
                                                <p className='text-blue-700 font-medium'>{currencyFormat(product?.productId?.sellingPrice)}</p>
                                                <p className='text-red-500 font-medium'>Total: {currencyFormat((product?.productId?.sellingPrice) * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-2 mt-1'>
                                                <button className=' border-red-500 border rounded-full w-6 h-6 flex justify-center items-center hover:bg-red-500 hover:text-white' onClick={() => decreaseQuantity(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className=' border-red-500 border rounded-full w-6 h-6 flex justify-center items-center hover:bg-red-500 hover:text-white' onClick={() => increaseQuantity(product?._id, product?.quantity)}>+</button>
                                            </div>

                                        </div>
                                    </div>

                                )
                            })
                        )
                    }
                </div>
                {/* Summary */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full mr-12 max-w-md'>
                            {
                                loading ? (<div className='h-36 bg-slate-300 border-slate-300 animate-pulse'>

                                </div>) : (<div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity:</p>
                                        <p> {totalQuantity} </p>
                                    </div>
                                    <div className='flex items-center justify-between px-4 py-2 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price:</p>
                                        <p> {currencyFormat(totalPrice)}</p>
                                    </div>

                                    <button className='bg-blue-600 p-4 text-white w-full hover:bg-blue-800 cursor-pointer' onClick={handlePayment}>Payment</button>

                                </div>)
                            }
                        </div>
                    )
                }



            </div>

        </div>

    )

}

export default Cart