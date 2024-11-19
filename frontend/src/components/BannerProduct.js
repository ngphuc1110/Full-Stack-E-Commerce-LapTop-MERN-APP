import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import banner1 from '../assest/banners/banner1.jpg'
import banner2 from '../assest/banners/banner2.webp'
import banner3 from '../assest/banners/banner3.webp'
import banner4 from '../assest/banners/banner4.webp'
import banner5 from '../assest/banners/banner5.webp'

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        } else {
            setCurrentImage(0)
        }

    }

    const previousImage = () => {
        if (currentImage > 0) {
            setCurrentImage(preve => preve - 1)
        } else {
            setCurrentImage(4)
        }
    }

    const desktopImages = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5,
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }

        }, 5000)
        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-6 rounded overflow-hidden '>
            <div className='h-80 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-3xl '>
                        <button onClick={previousImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                <div className='flex h-full w-full overflow-hidden '>
                    {
                        desktopImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default BannerProduct