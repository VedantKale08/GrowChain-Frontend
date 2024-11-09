"use client"
import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Lottie/LandingLottie.json";

const Landing = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      {/* Lottie Animation */}
      <div className="w-[500px] h-[500px]">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mt-5">Welcome to <span className="text-green-500">Grow</span>Chain</h1>
      <p className="text-lg mt-4 text-gray-500 px-48 text-center">
      Farm sustainability meets innovation! Track your water conservation, pesticide usage, and crop cycles with ease, all while earning exciting rewards for going green. 🌾💧
Let’s make farming sustainable and profitable—because when the Earth wins, you win too! 🌍💚
      </p>

      {/* Get Started Button */}
      <button className="mt-6 px-24 py-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 rounded-full text-xl font-semibold text-white shadow-lg">
  Get Started
</button>


    </div>
  );
};

export default Landing;
