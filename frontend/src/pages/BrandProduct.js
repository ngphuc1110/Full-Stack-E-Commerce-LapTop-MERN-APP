import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productBrand from '../helper/productBrand'
import productChipSet from '../helper/productChipSet'
import productGPU from '../helper/productGPU'
import VerticalProductSearch from '../components/VerticalProductSearch'
import SummaryApi from '../common'
import productRam from '../helper/productRam'
import RecommendProduct from '../components/RecommendProduct'
import productScreen from '../helper/productScreen'
import productStorage from '../helper/productStorage'
import productOs from '../helper/productOs'
import productWeight from '../helper/productWeight'
import productBattery from '../helper/productBattery'
import ProductScorer from '../components/ProductScorer'

const BrandProduct = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("brand")
    let urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
        urlCategoryListObject[el] = true
    })




    const [selectBrand, setSelectBrand] = useState(urlCategoryListObject)
    const [selectChipSet, setSelectChipSet] = useState({})
    const [selectGPU, setselectGPU] = useState({})
    const [selectRam, setselectRam] = useState({})
    const [selectStorage, setselectStorage] = useState({})
    const [selectScreen, setselectScreen] = useState({})
    const [selectOs, setselectOs] = useState({})
    const [selectWeight, setselectWeight] = useState({})
    const [selectBattery, setselectBattery] = useState({})

    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [filterChipSetList, setFilterChipSetList] = useState([])
    const [filterGPUList, setFilterGPUList] = useState([])
    const [filterRamList, setFilterRamList] = useState([])
    const [filterStorageList, setFilterStorageList] = useState([])
    const [filterScreenList, setFilterScreenList] = useState([])
    const [filterOsList, setFilterOsList] = useState([])
    const [filterWeightList, setFilterWeightList] = useState([])
    const [filterBatteryList, setFilterBatteryList] = useState([])

    const [sortBy, setSortBy] = useState("")
    const [recommend, SetRecommend] = useState("")
    const [bestProduct, setBestProduct] = useState({})


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
                ram: filterRamList,
                storage: filterStorageList,
                screen: filterScreenList,
                os: filterOsList,
                weight: filterWeightList,
                battery: filterBatteryList
            })
        })

        const dataResponse = await response.json()

        const productsWithScores = dataResponse?.data.map((product) => {
            const score = ProductScorer(product);
            return {
                ...product,
                score: score,
            };
        });

        console.log("productsWithScores", productsWithScores)

        setData(productsWithScores || [])

    }
    const handleSelectBrand = (e) => {
        const { value, checked } = e.target

        setSelectBrand((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    const handleSelectChipSet = (e) => {
        const { value, checked } = e.target

        setSelectChipSet((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })

    }

    const handleSelectGPU = (e) => {
        const { value, checked } = e.target

        setselectGPU((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    const handleSelectRam = (e) => {
        const { value, checked } = e.target

        setselectRam((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    const handleSelectOs = (e) => {
        const { value, checked } = e.target

        setselectOs((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    const handleSelectScreen = (e) => {
        const { value, checked } = e.target

        setselectScreen((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    const handleSelectStorage = (e) => {
        const { value, checked } = e.target

        setselectStorage((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    const handleSelectWeight = (e) => {
        const { value, checked } = e.target

        setselectWeight((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    const handleSelectBattery = (e) => {
        const { value, checked } = e.target

        setselectBattery((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData();
            SetRecommend("");
        }, 100);
        return () => clearTimeout(timeout);
    }, [filterCategoryList, filterChipSetList, filterGPUList, filterRamList, filterStorageList, filterScreenList, filterOsList, filterWeightList, filterBatteryList]);


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

        const arrayOfRam = Object.keys(selectRam).map(RamKeyName => {

            if (selectRam[RamKeyName]) {
                return RamKeyName
            }
            return null
        }).filter(el => el)

        const arrayOfOs = Object.keys(selectOs).map(OsKeyName => {

            if (selectOs[OsKeyName]) {
                return OsKeyName
            }
            return null
        }).filter(el => el)

        const arrayOfScreen = Object.keys(selectScreen).map(ScreenKeyName => {

            if (selectScreen[ScreenKeyName]) {
                return ScreenKeyName
            }
            return null
        }).filter(el => el)

        const arrayOfStorage = Object.keys(selectStorage).map(StorageKeyName => {

            if (selectStorage[StorageKeyName]) {
                return StorageKeyName
            }
            return null
        }).filter(el => el)

        const arrayOfWeight = Object.keys(selectWeight).map(WeightKeyName => {

            if (selectWeight[WeightKeyName]) {
                return WeightKeyName
            }
            return null
        }).filter(el => el)

        const arrayOfBattery = Object.keys(selectBattery).map(BatteryKeyName => {

            if (selectBattery[BatteryKeyName]) {
                return BatteryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfBrand)
        setFilterChipSetList(arrayOfCPU)
        setFilterGPUList(arrayOfGPU)
        setFilterOsList(arrayOfOs)
        setFilterRamList(arrayOfRam)
        setFilterScreenList(arrayOfScreen)
        setFilterStorageList(arrayOfStorage)
        setFilterWeightList(arrayOfWeight)
        setFilterBatteryList(arrayOfBattery)

        //format for url change when change on the chexbox
        const urlFormat = arrayOfBrand.map((el, index) => {
            if ((arrayOfBrand.length - 1) === index) {
                return `brand=${el}`
            }
            return `brand=${el}&&`
        })
        navigate("/category-product/?" + urlFormat.join(""))
    }, [selectBrand, selectChipSet, selectGPU, selectWeight, selectStorage, selectScreen, selectOs, selectRam, selectBattery])

    const handleOnChangeSortBy = (value) => {
        setSortBy(value)
        if (value === 'asc') {
            setData((preve) => [...preve].sort((a, b) => { return a.sellingPrice - b.sellingPrice }))
        }
        if (value === 'dsc') {
            setData((preve) => [...preve].sort((a, b) => { return b.sellingPrice - a.sellingPrice }))
        }
    }


    const handleOnClickRecommend = (value) => {
        SetRecommend(value);
        if (value === 'dsc') {
            const sortedData = [...data].sort((a, b) => {
                if (b.score === a.score) {
                    if (b.sellingPrice === a.sellingPrice) {
                        return b.price - a.price;
                    }
                    return a.sellingPrice - b.sellingPrice;
                }
                return b.score - a.score;
            });

            setData(sortedData);
            setBestProduct(sortedData[0])
        }
    };

    const handleOnClick = () => {
        setSelectBrand("");
        setSelectChipSet("");
        setselectGPU("");
        setselectRam("");
        setselectStorage("");
        setselectScreen("");
        setselectOs("");
        setselectWeight("");
        setselectBattery("");
    }

    useEffect(() => {
    }, [bestProduct]);


    return (
        <div className='container mx-auto p-4 min-h-[570px]'>
            <div className='hidden lg:grid grid-cols-[250px,1fr]'>
                {/* left side */}
                <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>

                    {/* Sort By */}
                    <div className=' '>
                        <h3 className='text-lg uppercase font-medium text-slate-500 border-b bp-2 border-slate-500'>Sort by</h3>
                        <div className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <button className='rounded-full bg-red-500 p-2 px-3 text-white hover:bg-red-700' onClick={() => handleOnChangeSortBy('asc')}>Price - Low to High</button>
                            </div>
                            <div className='flex items-center gap-3'>
                                <button className='rounded-full bg-red-500 p-2 px-3 text-white hover:bg-red-700' onClick={() => handleOnChangeSortBy('dsc')} >Price - High to Low</button>

                            </div>
                        </div>
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
                                            <div className='flex items-center gap-3' >
                                                <input type='checkbox' name={"brandName"} checked={selectBrand[brandNameData?.value]}
                                                    value={brandNameData?.value} id={brandNameData?.value}
                                                    key={brandNameData?.id} onChange={handleSelectBrand} />
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
                                            <div className='flex items-center gap-3' >
                                                <input type='checkbox' name={"chipSet"} id={chipSet?.value}
                                                    checked={selectChipSet[chipSet?.value]} value={chipSet?.value}
                                                    key={chipSet?.id} onChange={handleSelectChipSet} />
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
                                                <input type='checkbox' name={"gpu"} id={gpu?.value}
                                                    checked={selectGPU[gpu?.value]} value={gpu?.value}
                                                    key={gpu?.id} onChange={handleSelectGPU} />
                                                <label htmlFor={gpu?.value}>{gpu?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>Ram</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productRam.map((ram, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"ram"} id={ram?.value}
                                                    checked={selectRam[ram?.value]} value={ram?.value}
                                                    key={ram?.id} onChange={handleSelectRam} />
                                                <label htmlFor={ram?.value}>{ram?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>Screen</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productScreen.map((screen, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"screen"} id={screen?.value}
                                                    checked={selectScreen[screen?.value]} value={screen?.value}
                                                    key={screen?.id} onChange={handleSelectScreen} />
                                                <label htmlFor={screen?.value}>{screen?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>Storage</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productStorage.map((storage, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"storage"} id={storage?.value}
                                                    checked={selectStorage[storage?.value]} value={storage?.value}
                                                    key={storage?.id} onChange={handleSelectStorage} />
                                                <label htmlFor={storage?.value}>{storage?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>Battery</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productBattery.map((battery, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"battery"} id={battery?.value}
                                                    checked={selectBattery[battery?.value]} value={battery?.value}
                                                    key={battery?.id} onChange={handleSelectBattery} />
                                                <label htmlFor={battery?.value}>{battery?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>OS</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productOs.map((os, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"os"} id={os?.value}
                                                    checked={selectOs[os?.value]} value={os?.value}
                                                    key={os?.id} onChange={handleSelectOs} />
                                                <label htmlFor={os?.value}>{os?.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>

                        <div>
                            <h4 className='text-sm uppercase font-sm text-slate-500'>Weight</h4>
                            <form className='text-sm grid-flow-row gap-2 py-2 w-fit'>
                                {
                                    productWeight.map((weight, index) => {
                                        return (
                                            <div className='flex items-center gap-3'>
                                                <input type='checkbox' name={"weight"} id={weight?.value}
                                                    checked={selectWeight[weight?.value]} value={weight?.value}
                                                    key={weight?.id} onChange={handleSelectWeight} />
                                                <label htmlFor={weight?.value}>{weight?.label}</label>
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
                        <div className=''>
                            <button className='rounded-full bg-red-500 p-2 px-3 text-white hover:bg-red-700' onClick={() => handleOnClickRecommend('dsc')}>Recommendation</button>
                            {/* <button className='rounded-full bg-red-500 p-2 px-3 text-white hover:bg-red-700' onClick={() => handleOnClick()}>Clear</button> */}
                        </div>
                    </div>
                    <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] my-2'>
                        {
                            data.length !== 0 && (
                                recommend ? (<RecommendProduct data={data} loading={loading} bestProductId={bestProduct?._id} />) : (<VerticalProductSearch data={data} loading={loading} />)


                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrandProduct

