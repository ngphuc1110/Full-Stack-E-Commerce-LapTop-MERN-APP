import React from 'react'
import BrandList from '../components/BrandList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCartProduct from '../components/VerticalCartProduct'

const Home = () => {
    return (
        <div>
            <BrandList />
            <BannerProduct />
            <HorizontalCardProduct brandName={""} heading={"Popular's LapTops"} />
            <VerticalCartProduct brandName={"acer"} heading={"ACER"} />
            <VerticalCartProduct brandName={"asus"} heading={"ASUS"} />
            <VerticalCartProduct brandName={"dell"} heading={"DELL"} />
            <VerticalCartProduct brandName={"hp"} heading={"HP"} />
            <VerticalCartProduct brandName={"apple"} heading={"APPLE"} />
            <VerticalCartProduct brandName={"lenovo"} heading={"LENOVO"} />
            <VerticalCartProduct brandName={"msi"} heading={"MSI"} />
            <VerticalCartProduct brandName={"gigabyte"} heading={"GIGABYTE"} />
        </div>
    )
}

export default Home