import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.viewCartProduct.url, {
            method: SummaryApi.viewCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
        })
        setLoading(false)
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

            <div className='flex flex-col lg:flex-row gap-10 justify-between'>
                {/* View products in cart */}
                <div className='w-full max-w-5xl px-6'>
                    {
                        loading ? (
                            loadingCart.map(el => {
                                return (
                                    <div key={el + "Add to cart Loading"} className='w-full bg-slate-300 h-32 my-4 border border-slate-300 animate-pulse rounded'></div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add to cart Loading"} className='w-full bg-white h-32 my-4 border border-slate-300  rounded'></div>
                                )
                            })
                        )
                    }
                </div>
                {/* Summary */}
                <div className='mt-5 lg:mt-0 w-full mr-6 max-w-sm'>
                    {
                        loading ? (<div className='h-36 bg-slate-300 border-slate-300 animate-pulse'>
                            Total
                        </div>) : (<div className='h-36 bg-slate-300'>
                            Total
                        </div>)
                    }
                </div>


            </div>

        </div>

    )

}

export default Cart