import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productBrand from '../helper/productBrand'
import productChipSet from '../helper/productChipSet'
import productGPU from '../helper/productGPU'
import OtherProductDisplay from '../components/OtherProductDisplay'
import VerticalProductSearch from '../components/VerticalProductSearch'
import SummaryApi from '../common'

const BrandProduct = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectBrand, setSelectBrand] = useState({})
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                brandName: filterCategoryList
            })
        })

        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
        console.log("dataResponse", dataResponse)

    }
    const handleSelectBrand = (e) => {
        const { name, value, checked } = e.target

        setSelectBrand((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfBrand = Object.keys(selectBrand).map(brandKeyName => {
            console.log("brandKeyName", brandKeyName)
            if (selectBrand[brandKeyName]) {
                return brandKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfBrand)

    }, [selectBrand])


    return (
        <div className='container mx-auto p-4 '>
            <div className='hidden lg:grid grid-cols-[250px,1fr]'>
                {/* left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

                    {/* Sort By */}
                    <div className=' '>
                        <h3 className='text-lg uppercase font-medium text-slate-500 border-b bp-2 border-slate-500'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' />
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter By */}
                    <div className=' '>
                        <h3 className='text-lg uppercase font-medium text-slate-500 border-b bp-2 border-slate-500 '>Category</h3>
                        <div className=''>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>Brand</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productBrand.map((brandNameData, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"brandName"} checked={selectBrand[brandNameData?.value]} value={brandNameData?.value} id={brandNameData?.value} key={brandNameData?.id} onChange={handleSelectBrand} />
                                                <label htmlFor={brandNameData?.value}>{brandNameData?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>CPU</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productChipSet.map((chipSet, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"chipSet"} id={chipSet?.value} />
                                                <label htmlFor={chipSet?.value}>{chipSet?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>GPU</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productGPU.map((gpu, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"gpu"} id={gpu?.value} />
                                                <label htmlFor={gpu?.value}>{gpu?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                    </div>
                </div>
                {/* Display Product        */}
                <div className=''>
                    {
                        data.length !== 0 && !loading && (
                            <VerticalProductSearch data={data} loading={loading} />

                        )
                        // params?.brandName && (
                        //     <OtherProductDisplay brandName={params?.brandName} heading="Similar Products" />
                        // )
                    }
                </div>
            </div>
        </div>
    )
}

export default BrandProduct

