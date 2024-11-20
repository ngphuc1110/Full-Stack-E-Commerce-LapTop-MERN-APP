import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
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

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg py-2 my-3 '>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-7 '>No Data</p>
                    )
                }
            </div>
        </div>
    )
}

export default Cart