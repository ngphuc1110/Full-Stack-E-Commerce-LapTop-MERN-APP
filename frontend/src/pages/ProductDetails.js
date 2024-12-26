import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import currencyFormat from '../helper/currencyFormat';
import OtherProductDisplay from '../components/OtherProductDisplay';
import addToCart from '../helper/addToCart';
import Context from '../context';
import Chart from '../components/Chart';


const ProductDetails = () => {

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        productImage: [],
        chipSet: "",
        gpu: "",
        ram: "",
        screen: "",
        storage: "",
        description: "",
        price: "",
        os: "",
        weight: "",
        sellingPrice: "",
    })
    const params = useParams()
    const userId = params?.id
    const [loading, setLoading] = useState(false)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage, setZoomImage] = useState(false)

    const { fetchUserAddToCart } = useContext(Context)
    const navigate = useNavigate()

    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()
        setData(dataResponse?.data)
        setActiveImage(dataResponse?.data?.productImage[0])
    }

    useEffect(() => {
        fetchProductDetails()
    }, [userId])

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL)
    }

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        console.log("coordinate", left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({
            x,
            y
        })
    }, [zoomImageCoordinate])

    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate("/cart")
    }

    return (
        <div className='container mx-auto p-6 px-8  '>
            <div className='min-h-[220px] flex flex-col lg:flex-row gap-4'>
                {/* Product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-1'>
                        <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
                        {/* Zoom Product */}
                        {
                            zoomImage && (
                                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                    <div
                                        className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                                        style={{
                                            background: `url(${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                                        }}
                                    >

                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageListLoading.map((el, index) => {
                                            return (
                                                <div className=' h-20 w-20 bg-slate-200 rounded animate-pulse' key={'loadingImage' + index}>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data?.productImage.map((imgURL, index) => {
                                            return (
                                                <div className=' h-20 w-20 bg-slate-200 rounded ' key={imgURL}>
                                                    <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                                                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                                                        onClick={() => handleMouseEnterProduct(imgURL)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )

                        }
                    </div>

                </div>

                {/* Product Details */}
                {
                    loading ? (
                        <div className='grid gap-1 w-full' >
                            <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
                            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
                            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

                            <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

                            </div>

                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                                <p className='text-red-600 bg-slate-200 w-full'></p>
                                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2 w-full'>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                            </div>

                            <div className='w-full'>
                                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></p>
                                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-1 min-w-[560px]'>
                            <h2 className='text-red-600 rounded-full text-2xl lg:text-3xl font-medium uppercase inline-block w-fit'>{data?.brandName}</h2>
                            <h2 className='text-2xl lg:text-3xl font-medium'>{data?.productName}</h2>
                            <p></p>
                            <div className='text-red-500 flex items-center gap-1 py-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                            </div>

                            <div className='text-2xl font-medium'>
                                <p className='text-slate-500 line-through'>{currencyFormat(data.price)}</p>
                                <div className='flex gap-3'>
                                    <p className='text-blue-500'>{currencyFormat(data.sellingPrice)}</p>
                                    <p className='text-red-500'> -{Math.round(100 - (data.sellingPrice / data.price) * 100)} %</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-4'>
                                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e) => handleBuyProduct(e, data?._id)} >Buy</button>
                                <button className='border-2 border-red-500 rounded px-3 py-1 min-w-[100px] text-white font-medium bg-red-600 hover:bg-white hover:text-red-600' onClick={(e) => handleAddToCart(e, data?._id)}>Add to Cart</button>
                            </div>

                        </div>
                    )
                }
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 left-auto'>
                    <div className='h-[300px] w-[400px] lg:h-96 lg:w-96 bg-slate-200 relative p-1'>
                        <Chart productData={data} />
                    </div>


                </div>

            </div>
            <div className='my-5'>
                <div className="bg-white p-4 rounded-lg shadow-lg ">
                    <table className="table-auto w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Specifications</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Brand</td>
                                <td className="border border-gray-300 px-4 py-2 capitalize">{data.brandName}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">CPU</td>
                                <td className="border border-gray-300 px-4 py-2 capitalize">{data?.chipSet}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">GPU</td>
                                <td className="border border-gray-300 px-4 py-2 capitalize">{data?.gpu}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">RAM</td>
                                <td className="border border-gray-300 px-4 py-2 capitalize" >{data?.ram} GB</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Storage</td>
                                <td className="border border-gray-300 px-4 py-2 capitalize">{data?.storage}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Operating System</td>
                                <td className="border border-gray-300 px-4 py-2 capitalize">{data?.os}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Weight</td>
                                <td className="border border-gray-300 px-4 py-2">{data?.weight} Kg</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Battery</td>
                                <td className="border border-gray-300 px-4 py-2">{data?.battery}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='text-slate-600 font-medium my-5'>
                Description: {data.description}
            </div>
            {
                data.brandName && (<OtherProductDisplay heading="Similar Products" productId={params?.id} />)
            }


        </div>

    )
}
export default ProductDetails