"use client";

import React from "react";
import { Sprout } from "lucide-react";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        Guidelines for Sustainable Farming
      </h1>

      <ul className="space-y-4 text-lg text-gray-800">
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Use organic farming methods to reduce chemical usage and maintain soil health.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Practice crop rotation to enhance soil fertility and prevent pest build-up.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Reduce water waste by implementing efficient irrigation techniques, like drip irrigation.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Minimize the use of synthetic fertilizers and pesticides to protect biodiversity.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Promote agroforestry and integrate trees into farming systems for ecosystem balance.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Encourage the use of renewable energy sources such as solar power on farms.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Recycle organic waste to create compost for enriching the soil.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Conserve native species of plants and animals to maintain the ecological balance.
        </li>
        <li className="flex items-center gap-2">
          <Sprout size={20} color="green" />
          Improve farm resilience by diversifying crops and livestock to withstand climate variability.
        </li>
      </ul>
    </div>
  );
};

export default Guidelines;
