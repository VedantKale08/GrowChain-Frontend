"use client"
import React, { useEffect } from "react";
import ExpertList from "./ExpertList";
import { Search } from "lucide-react";
import Card from "./Card";
import AOS from "aos";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 400 });
  }, []);
  
  return (
    <div className="relative flex p-6">
      <div className="flex-1 flex flex-col gap-7 px-12 pr-20">
        <div className="bg-white flex gap-3 px-5 py-4 rounded-full">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none border-none"
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-7">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} />
          ))}
        </div>
      </div>

      <div>
        <ExpertList />
      </div>
    </div>
  );
}

export default Home;
