import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import currencyFormat from '../helper/currencyFormat'
import { Link } from 'react-router-dom'
import { MdModeEdit } from 'react-icons/md'
import ChangeUserOrder from '../components/ChangeUserOrder'

const Order = () => {
    const [allOrders, setAllOrders] = useState([])
    const [openUpdateOrder, setOpenUpdateOrder] = useState(false)
    const [updateOrderDetails, setUpdateOrderDetails] = useState({
        address: "",
        phone: "",
        orderStatus: "",
        _id: "",
    })
    const [data, setData] = useState([])

    const extractedData = allOrders.map(data => ({
        email: data.email || "",
        address: data.address || "",
        phone: data.phone || "",
        orderStatus: data.orderStatus || "",
        _id: data._id || "",
    }));


    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
            credentials: "include",
        })
        const responseData = await response.json()
        setAllOrders(responseData.data)
        console.log("Order List", responseData.data)
    }
    console.log("updateOrderDetails", updateOrderDetails)

    useEffect(() => {
        fetchOrderDetails()
    }, [])


    return (
        <div className='mx-auto container p-4 min-h-[583px] '>
            {!allOrders[0] && (
                <p>No Order Available</p>
            )}
            <div >
                {
                    allOrders.map((item, index) => {
                        return (

                            <div key={item.userId + index}>
                                <h1 className='font-medium text-lg pb-4'>Email: {item.email}</h1>
                                <div className=' flex items-center justify-between'>
                                    <p className='font-medium text-lg pb-2'>{moment(item.createdAt).format('LLL')}</p>
                                    <button className='bg-green-200 rounded-full p-3 cursor-pointer hover:bg-green-500 hover:text-white'
                                        onClick={() => {

                                            setUpdateOrderDetails(item)
                                            setOpenUpdateOrder(true)

                                        }}>
                                        <MdModeEdit />
                                    </button>
                                </div>

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

                                                                        <div className='flex-row flex'>
                                                                            <p>Status: </p>
                                                                            {
                                                                                item.orderStatus == "cancelled" ? (<p className='capitalize text-red-700' >{item.orderStatus}</p>)
                                                                                    : ((<p className='capitalize text-green-700' >{item.orderStatus}</p>))

                                                                            }
                                                                        </div>



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
                                <div className='text-lg font-medium p-4 rounded-full bg-green-300 w-fit mt-5 ml-auto'>
                                    Total Amount : {currencyFormat(item.totalAmount)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {
                openUpdateOrder && (
                    <ChangeUserOrder
                        onClose={() => setOpenUpdateOrder(false)}
                        orderStatus={updateOrderDetails.orderStatus}
                        phone={updateOrderDetails.phone}
                        email={updateOrderDetails.email}
                        address={updateOrderDetails.address}
                        orderId={updateOrderDetails._id}
                        callFunc={fetchOrderDetails}
                    />
                )
            }
        </div>
    )
}

export default Order