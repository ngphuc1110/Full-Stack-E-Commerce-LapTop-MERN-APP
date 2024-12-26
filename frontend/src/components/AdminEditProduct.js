import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import productBrand from '../helper/productBrand';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helper/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import productRam from '../helper/productRam';
import productGPU from '../helper/productGPU';
import productChipSet from '../helper/productChipSet';
import productStorage from '../helper/productStorage';
import productScreen from '../helper/productScreen';
import productOs from '../helper/productOs';
import productWeight from '../helper/productWeight';
import productBattery from '../helper/productBattery';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchData,
}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        productImage: productData?.productImage || [],
        chipSet: productData?.chipSet,
        gpu: productData?.gpu,
        ram: productData?.ram,
        screen: productData?.screen,
        storage: productData?.storage,
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice,
        weight: productData?.weight,
        battery: productData?.battery,
        os: productData?.os
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")


    const handleOnChage = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]


        const uploadImageCloundinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloundinary.url]
            }
        })

    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index ", index)

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }

    {/**upload Product */ }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }
    return (

        <div className='fixed w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-200 bg-opacity-55'>

            <div className='bg-white p-4 rounder w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center py-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <button className='w-fit ml-auto text-2xl hover:text-red-600' onClick={onClose} >
                        <MdClose />
                    </button>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name: </label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter Product Name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChage}
                        className='p-2 bg-slate-100 border rounded'
                        required />



                    <label htmlFor='brandName' className='mt-3'>Brand Name: </label>
                    <select value={data.brandName} required name='brandName' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select Brand</option>
                        {
                            productBrand.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image: </label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounder h-32 w-full flex justify-center items-center cursor-pointer' >

                            <div className='text-slate-500 flex justify-center items-center flex-col'>
                                <span className='text-3xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'> Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>

                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2 '>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (

                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt={el} width={89} height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                        }} />

                                                    <div className='absolute bottom-0 right-0 p-1 text-white
                                                     bg-red-500 rounded-full cursor-pointer
                                                      hover:bg-red-700 hidden group-hover:block 
                                                      ' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className=' text-red-600 text-xs'> *Upload Image</p>
                            )
                        }

                    </div>

                    <label htmlFor='chipSet' className='mt-3'>CPU: </label>
                    <select value={data.chipSet} required name='chipSet' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select CPU</option>
                        {
                            productChipSet.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='gpu' className='mt-3'>GPU: </label>
                    <select value={data.gpu} required name='gpu' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select GPU</option>
                        {
                            productGPU.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='ram' className='mt-3'>RAM: </label>
                    <select value={data.ram} required name='ram' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select RAM</option>
                        {
                            productRam.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='storage' className='mt-3'>Storage: </label>
                    <select value={data.storage} required name='storage' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select Storage</option>
                        {
                            productStorage.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='screen' className='mt-3'>Screen: </label>
                    <select value={data.screen} required name='screen' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select Screen</option>
                        {
                            productScreen.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='battery' className='mt-3'>Battery: </label>
                    <select value={data.battery} required name='battery' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select Battery</option>
                        {
                            productBattery.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='os' className='mt-3'>Operating System: </label>
                    <select value={data.os} required name='os' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select OS</option>
                        {
                            productOs.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='weight' className='mt-3'>Weight: </label>
                    <select value={data.weight} required name='weight' onChange={handleOnChage} className='p-2 bg-slate-100 border rounded' >
                        <option value={""}>Select Weight</option>
                        {
                            productWeight.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='price' className='mt-3' >Price: </label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Enter Price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChage}
                        className='p-2 bg-slate-100 border rounded'
                        required />

                    <label htmlFor='sellingPrice' className='mt-3' >Selling Price: </label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='Enter Selling Price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChage}
                        className='p-2 bg-slate-100 border rounded'
                        required />

                    <label htmlFor='description' className='mt-3' >Description: </label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none'
                        placeholder='Enter Product description'
                        rows={3}
                        onChange={handleOnChage}
                        name='description'
                        value={data.description}>
                    </textarea>


                    <button className='px-3 py-1 bg-red-500 text-white mb-12 mt-3 hover:bg-red-700'> Update Product</button>

                </form>

            </div>

            {/**display img full screen */}
            {
                openFullScreenImage && (<DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />)
            }


        </div>
    )
}

export default AdminEditProduct