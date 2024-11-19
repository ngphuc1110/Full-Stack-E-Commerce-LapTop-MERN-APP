import React from 'react'
import { MdClose } from "react-icons/md";


const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center' onClick={onClose}>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>

                <div className='flex justify-center p-4 max-w-[70vh] max-h-[80vh] '>
                    <img src={imgUrl} className='w-full h-full'></img>
                </div>
            </div>

        </div>
    )
}

export default DisplayImage