import React, { useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import OrderStatus from '../helper/orderStatus';

const ChangeUserOrder = ({
    phone,
    email,
    address,
    orderStatus,
    orderId,
    callFunc,
    onClose }
) => {
    const [updateorderStatus, setUpdateOrderStatus] = useState(orderStatus)
    const [data, setData] = useState({
        phone,
        email,
        address,
    })

    const handleOnChage = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            }
        })
    }

    const handleOnChageSelect = (e) => {
        setUpdateOrderStatus(e.target.value)
    }

    const updateUserOrder = async () => {
        const fetchResponse = await fetch(SummaryApi.updateOrder.url, {
            method: SummaryApi.updateOrder.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                orderId: orderId,
                phone: data.phone,
                address: data.address,
                orderStatus: updateorderStatus,
            })
        })
        const dataResponse = await fetchResponse.json()

        if (dataResponse.success) {
            toast.success(dataResponse.message)
            onClose()
            callFunc()
        }

        console.log("response Data", dataResponse)
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-55 '>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm' >
                <button className='block ml-auto ' onClick={onClose} >
                    <IoMdCloseCircleOutline />
                </button>
                <h1 className='pb-4 text-lg font-bold'>Edit Order</h1>
                <form className='grid p-4 gap-2' onSubmit={updateUserOrder}>
                    <p>Email : {email}</p>
                    <label htmlFor='address'> Address: </label>
                    <input
                        type='text'
                        id='address'
                        placeholder='Enter Address'
                        name='address'
                        value={data.address}
                        onChange={handleOnChage}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    <label htmlFor='phone'> Phone: </label>
                    <input
                        type='text'
                        id='phone'
                        placeholder='Enter Phone Number'
                        name='phone'
                        value={data.phone}
                        onChange={handleOnChage}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    <div className='flex items-center justify-between my-4 '>
                        <p>Order Status :</p>
                        <select className='border px-4 py-1 ' value={updateorderStatus} onChange={handleOnChageSelect}>
                            {
                                Object.values(OrderStatus).map(el => {
                                    return (
                                        <option value={el.value} key={el.id}>
                                            {el.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'>Update</button>

                </form>
            </div>
        </div>
    )
}

export default ChangeUserOrder