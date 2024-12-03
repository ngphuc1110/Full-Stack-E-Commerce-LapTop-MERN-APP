import React from 'react'
import SUCCESSGIF from '../assest/success.gif'
import { Link } from 'react-router-dom'
const Success = () => {
    return (
        <div className='mx-auto container p-4 min-h-[583px]'>
            <div className=' w-full max-w-md mx-auto flex justify-center items-center flex-col p-6 mix-blend-multiply rounded my-20'>
                <img src={SUCCESSGIF}
                    width={150}
                    height={150}
                />
                <p className='text-green-600 font-bold text-xl p-2'>Payment Successfully !!!</p>
                <Link to={'/order'} className='p-2 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>See Order</Link>
            </div>
        </div>

    )
}

export default Success