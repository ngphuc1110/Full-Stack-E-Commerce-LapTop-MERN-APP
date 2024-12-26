import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import currencyFormat from '../helper/currencyFormat'
import { Link } from 'react-router-dom'

const Order = () => {
    const [data, setData] = useState([])
    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.orderList.url, {
            method: SummaryApi.orderList.method,
            credentials: "include",
        })
        const responseData = await response.json()
        setData(responseData.data)
    }

    console.log("data", data)
    useEffect(() => {
        fetchOrderDetails()
    }, [])
    return (
        <div className='mx-auto container p-4 min-h-[583px] '>
            {!data[0] && (
                <p>No Order Available</p>
            )}
            <div >
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.userId + index}>
                                <p className='font-medium text-lg pb-4'>{moment(item.createdAt).format('LLL')}</p>
                                <div>
                                    {
                                        item.productDetails.map((product, index2) => {
                                            return (
                                                <div key={product.productId + index2} className='flex flex-row gap-5 items-center bg-slate-300 p-3'>
                                                    <img src={product.image[0]}
                                                        className='w-32 h-32 p-1 bg-white '
                                                    />
                                                    <div className='mb-5 w-1/4'>
                                                        <Link to={"/product/" + product?.productId} className='text-md font-medium'>{product.name}</Link>
                                                        <div>{currencyFormat(product.price)}</div>
                                                        <p>Quantity: {product.quantity}</p>
                                                    </div>
                                                    <div className='mb-5 w-1/6' >
                                                        <div className='text-md font-medium'>Payment Details: </div>
                                                        <div></div>
                                                        <div className='flex-row flex'>
                                                            <p>Payment Method:</p>
                                                            <p className='px-2 capitalize'>{item.paymentDetails.payment_method_types[0]}</p>
                                                        </div>
                                                        <div className='flex-row flex'>
                                                            <p>Payment Status:</p>
                                                            <p className='px-2 text-green-600 capitalize'>{item.paymentDetails.payment_status}</p>
                                                        </div>

                                                    </div>
                                                    <div className='mb-5 w-fit'>
                                                        <div className='text-md font-medium'>Order Details:</div>
                                                        {
                                                            item.shipping_options.map((shipping, index) => {
                                                                return (
                                                                    <div key={shipping.shipping_rate}>
                                                                        {
                                                                            index2 === 0 ? (<p>Shipping Amount: {shipping.shipping_amount}</p>)
                                                                                : (<p>Shipping Amount: 0</p>)
                                                                        }
                                                                        {
                                                                            <p className='capitalize' >Order Status: {item.orderStatus}</p>
                                                                        }

                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className='mb-5 w-fit'>
                                                        <div className='text-md font-medium'>Customer Details:</div>
                                                        {
                                                            <div >
                                                                <p>Phone: {item.phone}</p>
                                                                <p>Address: {item.address}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                                <div className='w-fit mt-5 ml-auto flex-row flex'>
                                    {
                                        item.orderStatus == "cancelled" ? (<div className='text-lg font-medium p-4 rounded-full bg-red-500 text-white mr-10 capitalize'>
                                            Status : {item.orderStatus}
                                        </div>)
                                            : (<div className='text-lg font-medium p-4 rounded-full bg-green-500 text-white mr-10 capitalize'>
                                                Status : {item.orderStatus}
                                            </div>)
                                    }

                                    <div className='text-lg font-medium p-4 rounded-full bg-green-500 '>
                                        Total Amount : {currencyFormat(item.totalAmount)}
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Order