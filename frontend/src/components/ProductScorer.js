import React from "react";
import productGPU from "../helper/productGPU";
import productChipSet from "../helper/productChipSet";
import productScreen from "../helper/productScreen";
import productRam from "../helper/productRam";
import productStorage from "../helper/productStorage";
import productOs from "../helper/productOs";
import productWeight from "../helper/productWeight";
import productBattery from "../helper/productBattery";

const ProductScorer = (product) => {
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

    const osScore = productOs.find((os) => os.value === product.os)?.score || 0;
    score += osScore;

    const weightScore = productWeight.find((weight) => weight.value === product.weight)?.score || 0;
    score += weightScore;

    const batteryScore = productBattery.find((battery) => battery.value === product.battery)?.score || 0;
    score += batteryScore;

    return roundTo(score);
};

const roundTo = (num) => {
    const factor = Math.pow(10, 2);
    return Math.round(num * factor) / factor;
};


export default ProductScorer;
