import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import productGPU from '../helper/productGPU';
import productChipSet from '../helper/productChipSet';
import productRam from '../helper/productRam';
import productScreen from '../helper/productScreen';
import productStorage from '../helper/productStorage';
import productWeight from '../helper/productWeight';
import productOs from '../helper/productOs';
import productBattery from '../helper/productBattery';

const Chart = ({ productData = [] }) => {
  const gpuScore = productGPU.find((gpu) => gpu.value === productData.gpu)?.score || 0;
  const chipsetScore = productChipSet.find((chipSet) => chipSet.value === productData.chipSet)?.score || 0;
  const ramScore = productRam.find((ram) => ram.value === productData.ram)?.score || 0;
  const screenScore = productScreen.find((screen) => screen.value === productData.screen)?.score || 0;
  const storageScore = productStorage.find((storage) => storage.value === productData.storage)?.score || 0;
  const weightScore = productWeight.find((weight) => weight.value === productData.weight)?.score || 0;
  const osScore = productOs.find((os) => os.value === productData.os)?.score || 0;
  const batteryScore = productBattery.find((battery) => battery.value === productData.battery)?.score || 0;

  const scores = [
    { subject: "GPU", score: gpuScore * 100 / Math.max(...productGPU.map(gpu => gpu.score)) },
    { subject: "Chipset", score: chipsetScore * 100 / Math.max(...productChipSet.map(chipSet => chipSet.score)) },
    { subject: "RAM", score: ramScore * 100 / Math.max(...productRam.map(ram => ram.score)) },
    { subject: "Screen", score: screenScore * 100 / Math.max(...productScreen.map(screen => screen.score)) },
    { subject: "Storage", score: storageScore * 100 / Math.max(...productStorage.map(storage => storage.score)) },
    { subject: "Weight", score: weightScore * 100 / Math.max(...productWeight.map(weight => weight.score)) },
    { subject: "OS", score: osScore * 100 / Math.max(...productOs.map(os => os.score)) },
    { subject: "Battery", score: batteryScore * 100 / Math.max(...productBattery.map(battery => battery.score)) },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={scores}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0, 100]} />
        <Radar name="Product Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
