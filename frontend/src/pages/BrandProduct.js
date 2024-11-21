import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
    const navigate = useNavigate()

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("brand")
    const urlCategoryListinArray2 = urlSearch.getAll("cpu")
    // const urlCategoryListinArray = [
    //     ...urlCategoryListinArray1,
    //     ...urlCategoryListinArray2
    // ]
    const rulCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        rulCategoryListObject[el] = true
    })
    console.log("rulCategoryListObject", rulCategoryListObject)
    console.log("urlCategoryListinArray", urlCategoryListinArray)



    const [selectBrand, setSelectBrand] = useState(rulCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")


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

        //format for url change when change on the chexbox
        const urlFormat = arrayOfBrand.map((el, index) => {
            if ((arrayOfBrand.length - 1) === index) {
                return `brand=${el}`
            }
            return `brand=${el}&&`
        })
        navigate("/category-product/?" + urlFormat.join(""))
        //category-product/?brand=acer&&brand=asus&&cpu=5
    }, [selectBrand])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target
        setSortBy(value)
        if (value === 'asc') {
            setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
        }
        if (value === 'dsc') {
            setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }

    useEffect(() => {

    }, [sortBy])

    return (
        <div className='container mx-auto p-4 '>
            <div className='hidden lg:grid grid-cols-[250px,1fr]'>
                {/* left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>

                    {/* Sort By */}
                    <div className=' '>
                        <h3 className='text-lg uppercase font-medium text-slate-500 border-b bp-2 border-slate-500'>Sort by</h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'asc'} value={"asc"} onChange={handleOnChangeSortBy} />
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} value={"dsc"} onChange={handleOnChangeSortBy} />
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
                <div className='px-10'>
                    <p className='font-medium text-slate-400 text-lg my-2 '>Search Results: {data.length}</p>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
                        {
                            data.length !== 0 && (
                                <VerticalProductSearch data={data} loading={loading} />

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandProduct

