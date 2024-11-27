import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productBrand from '../helper/productBrand'
import productChipSet from '../helper/productChipSet'
import productGPU from '../helper/productGPU'
import OtherProductDisplay from '../components/OtherProductDisplay'
import VerticalProductSearch from '../components/VerticalProductSearch'
import SummaryApi from '../common'
import productRam from '../helper/productRam'
import RecommendProduct from '../components/RecommendProduct'
import productScreen from '../helper/productScreen'
import productStorage from '../helper/productStorage'

const BrandProduct = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("brand")
    //const urlCategoryListinArray2 = urlSearch.getAll("cpu")
    // const urlCategoryListinArray = [
    //     ...urlCategoryListinArray1,
    //     ...urlCategoryListinArray2
    // ]
    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })


    const [selectBrand, setSelectBrand] = useState(urlCategoryListObject)
    const [selectChipSet, setSelectChipSet] = useState({})
    const [selectGPU, setselectGPU] = useState({})
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [filterChipSetList, setFilterChipSetList] = useState([])
    const [filterGPUList, setFilterGPUList] = useState([])
    const [sortBy, setSortBy] = useState("")
    const [recommend, SetRecommend] = useState("")


    const fetchData = async () => {
        const response = await fetch(SummaryApi.filterProduct.url, {
            method: SummaryApi.filterProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                brandName: filterCategoryList,
                chipSet: filterChipSetList,
                gpu: filterGPUList,
            })
        })

        const dataResponse = await response.json()

        const calculateProductScore = (product) => {
            let score = 0;


            const gpuScore = productGPU.find((gpu) => gpu.value === product.gpu)?.score || 0;
            score += gpuScore;


            const chipSetScore = productChipSet.find((chipSet) => chipSet.value === product.chipSet)?.score || 0;
            score += chipSetScore;

            const screenScore = productScreen.find((screen) => screen.value === product.screen)?.score || 0;
            score += screenScore;

            const ramScore = productRam.find((ram) => ram.value === product.ram)?.score || 0;
            score += ramScore;

            const storageScore = productStorage.find((storage) => storage.value === product.storage)?.score || 0;
            score += storageScore;

            return score;
        };

        const productsWithScores = dataResponse?.data.map((product) => {
            const score = calculateProductScore(product);
            return {
                ...product,
                score: score,
            };
        });

        console.log("productsWithScores", productsWithScores)

        setData(productsWithScores || [])

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

    const handleSelectChipSet = (e) => {
        const { name, value, checked } = e.target

        setSelectChipSet((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })

    }

    const handleSelectGPU = (e) => {
        const { name, value, checked } = e.target

        setselectGPU((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })

    }

    useEffect(() => {
        fetchData()
        SetRecommend("")
    }, [filterCategoryList, filterChipSetList, filterGPUList])

    useEffect(() => {
        const arrayOfBrand = Object.keys(selectBrand).map(brandKeyName => {

            if (selectBrand[brandKeyName]) {
                return brandKeyName
            }
            return null
        }).filter(el => el)

        const arrayOfCPU = Object.keys(selectChipSet).map(chipSetdKeyName => {

            if (selectChipSet[chipSetdKeyName]) {
                return chipSetdKeyName
            }
            return null
        }).filter(el => el)

        const arrayOfGPU = Object.keys(selectGPU).map(GPUKeyName => {

            if (selectGPU[GPUKeyName]) {
                return GPUKeyName
            }
            return null
        }).filter(el => el)

        //const combinedArray = [...arrayOfBrand, ...arrayOfCPU, ...arrayOfGPU];
        setFilterCategoryList(arrayOfBrand)
        setFilterChipSetList(arrayOfCPU)
        setFilterGPUList(arrayOfGPU)

        //format for url change when change on the chexbox
        const urlFormat = arrayOfBrand.map((el, index) => {
            if ((arrayOfBrand.length - 1) === index) {
                return `brand=${el}`
            }
            return `brand=${el}&&`
        })
        navigate("/category-product/?" + urlFormat.join(""))
    }, [selectBrand, selectChipSet, selectGPU])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target
        setSortBy(value)
        if (value === 'asc') {
            setData((preve) => [...preve].sort((a, b) => a.sellingPrice - b.sellingPrice))
        }
        if (value === 'dsc') {
            setData((preve) => [...preve].sort((a, b) => b.sellingPrice - a.sellingPrice))
        }
    }


    const handleOnClickRecommend = (value) => {
        SetRecommend(value);
        if (value === 'dsc') {
            setData((preve) =>
                [...preve].sort((a, b) => {
                    if (b.score === a.score) {
                        return a.sellingPrice - b.sellingPrice; // Sản phẩm nào rẻ hơn sẽ đứng trước
                    }
                    return b.score - a.score; // Sắp xếp giảm dần theo score
                })
            );
        }
    };


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
                                                <input type='checkbox' name={"chipSet"} id={chipSet?.value} checked={selectChipSet[chipSet?.value]} value={chipSet?.value} key={chipSet?.id} onChange={handleSelectChipSet} />
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
                                                <input type='checkbox' name={"gpu"} id={gpu?.value} checked={selectGPU[gpu?.value]} value={gpu?.value} key={gpu?.id} onChange={handleSelectGPU} />
                                                <label htmlFor={gpu?.value}>{gpu?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                    </div>
                </div>
                {/* Display Product  */}
                <div className='px-10'>
                    <div className='flex justify-between'>
                        <p className='font-medium text-slate-400 text-lg my-2 '>Search Results: {data.length}</p>
                        <button className='rounded-full bg-red-500 p-2 px-3 text-white hover:bg-red-700' onClick={() => handleOnClickRecommend('dsc')}>Recommendation</button>
                    </div>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] my-2'>
                        {
                            data.length !== 0 && (
                                recommend ? (<RecommendProduct data={data} loading={loading} />) : (<VerticalProductSearch data={data} loading={loading} />)


                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandProduct

