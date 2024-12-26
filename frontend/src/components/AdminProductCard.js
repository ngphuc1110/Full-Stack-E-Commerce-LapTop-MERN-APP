import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import currencyFormat from '../helper/currencyFormat';


const AdminProductCard = ({
    data,
    fetchData
}) => {
    const [editProduct, setEditProduct] = useState(false)
    return (
        <div>
            <div className='bg-white p-4 rounded '>
                <div className='fixed-image '>
                    <img src={data?.productImage[0]} width={120} height={120} className='w-fit mx-auto' />
                    <h1 className='min-h-12'>
                        {data.productName}
                    </h1>

                    <p className='text-blue-700 '>
                        {currencyFormat(data.sellingPrice)}
                    </p>

                    <div className='w-fit ml-auto bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                </div>
                {
                    editProduct && (
                        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData} />
                    )
                }

            </div>
        </div>
    )
}

export default AdminProductCard