"use client";
import React from "react";
import SustanibilityGraph from "./SustanibilityGraph";
import DoughnutChart from "./DoughnutChart";
import TokenEarningsBreakdown from "./TokenEarningsBreakdown";

function Dashboard() {
  return (
    <div className="p-6 w-full flex flex-col gap-7">
      <div className="flex gap-7">
        <div className="bg-white rounded-xl p-8 flex-1 w-full h-[450px]">
          <p>Sustainability Analysis</p>
          <SustanibilityGraph />
        </div>
        <div className="bg-white rounded-xl p-8 w-[400px] h-[450px] flex flex-col items-center">
          <DoughnutChart />
        </div>
      </div>
      <div className="bg-white rounded-xl p-8 w-full h-[650px]">
        <p>Sustainability Analysis</p>
        <TokenEarningsBreakdown />
      </div>
    </div>
  );
}

export default Dashboard;
