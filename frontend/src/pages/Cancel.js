import React from 'react'
import CANCELGIF from '../assest/cancel.gif'
import { Link } from 'react-router-dom'
const Cancel = () => {
    return (
        <div className='mx-auto container p-4 min-h-[583px]'>
            <div className='w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 mix-blend-multiply rounded my-20'>
                <img src={CANCELGIF}
                    width={150}
                    height={150}
                />
                <p className='text-red-600 font-bold text-xl p-2'>Payment Declined !!!</p>
                <p className='text-red-600 font-sans text-md p-2 '>Please check your payment method again!</p>
                <Link to={'/cart'} className='p-2 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
            </div>
        </div>

    )
}

export default Cancel