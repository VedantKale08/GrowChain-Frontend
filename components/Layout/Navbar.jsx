"use client"
import { tabsStore } from "@/store/tabStore";
import React from "react";

function Navbar() {
  const setTab = tabsStore((state) => state.setTab);
  return (
    <div className="border h-[70px] top-0 bg-white flex justify-end items-center z-40">
      <div className="mr-14 flex gap-5">
        {/* <div
          className="p-3 bg-slate-200 rounded-full"
          onClick={() => setTab("Notifications")}
        >
          <Tooltip title="Notifications">
            <BellRing />
          </Tooltip>
        </div>
        <div className="p-3 bg-slate-200 rounded-full">
          <Tooltip title="Points">
            <Coins />
          </Tooltip>
        </div> */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setTab("Profile")}
        >
          {/* <img
            src={`https://gateway.pinata.cloud/ipfs${user?.data?.image?.substring(
              6
            )}`}
            alt=""
            className="w-12 h-12 rounded-full"
          ></img> */}
          <div className="bg-orange-500 w-10 h-10 rounded-full"></div>
          <p className="text-lg">Vedant Kale</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
