import React from "react";
import ExpertList from "./ExpertList";
import { Search } from "lucide-react";
import Card from "./Card";

function Home() {
  return (
    <div className="relative flex p-6 gap-7">
      <div className="flex-1 flex flex-col gap-7">
        <div className="bg-white flex gap-3 px-5 py-4 rounded-full">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none border-none"
          />
        </div>

        {/* Cards */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} />
        ))}
      </div>

      <div>
        <ExpertList />
      </div>
    </div>
  );
}

export default Home;
