"use client";
import React, { useEffect } from "react";
import SustanibilityGraph from "./SustanibilityGraph";
import DoughnutChart from "./DoughnutChart";
import { CloudRain, Droplets, Thermometer, ThermometerSun } from "lucide-react";
import TokenEarningsBreakdown from "./TokenEarningsBreakdown";
import AOS from "aos";

function Dashboard() {
  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);
  return (
    <div className="p-6 w-full flex flex-col gap-7">
      {/* New Weather Information Boxes */}
      <div className="flex gap-7">
        <div
          data-aos="fade-right"
          className="bg-white w-full rounded-xl p-6 flex flex-col justify-between"
        >
          <ThermometerSun size={30} />
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">+24°C</div>
              <p className="text-lg">Air Temp</p>
            </div>
            <div className="mt-2 border border-black rounded-full px-3 py-1">
              Good
            </div>
          </div>
        </div>
        <div
          data-aos="fade-down"
          className="bg-white w-full rounded-xl p-6 flex flex-col justify-between"
        >
          <Droplets size={30} />
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">72%</div>
              <p className="text-lg">Soil Moisture</p>
            </div>
            <div className="mt-2 border border-black rounded-full px-3 py-1">
              High
            </div>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="bg-white w-full rounded-xl p-6 flex flex-col justify-between"
        >
          <CloudRain size={30} />
          <div className="flex justify-between items-end">
            <div>
              <div className="text-2xl font-bold">-2mm</div>
              <p className="text-lg">Precipitation</p>
            </div>
            <div className="mt-2 border border-black rounded-full px-3 py-1">
              Low
            </div>
          </div>
        </div>
      </div>

      {/* Existing Graphs Section */}
      <div className="flex gap-7">
        <div className="bg-white rounded-xl p-8 flex-1 w-full h-[450px]">
          <p>Sustainability Analysis</p>
          <SustanibilityGraph />
        </div>
        <div className="bg-white rounded-xl p-8 w-[400px] h-[450px] flex flex-col items-center">
          <DoughnutChart />
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 w-full h-[550px]">
        <p>Sustainability Analysis</p>
        <TokenEarningsBreakdown />
      </div>
    </div>
  );
}

export default Dashboard;
