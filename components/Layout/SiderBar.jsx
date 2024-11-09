"use client";
import { tabsStore } from "@/store/tabStore";
import {
  BellRing,
  HandCoins,
  Home,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

const SideBar = () => {
  const [popup, setPopup] = useState(false);
  const setTab = tabsStore((state) => state.setTab);
  const tab = tabsStore((state) => state.tab);
  const tabs = useMemo(
    () => [
      {
        name: "Home",
        icon: Home,
        link:"/feed"
      },
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        link:"/dashboard"
      },
      {
        name: "Rewards",
        icon: HandCoins,
        link:"/rewards"
      },
      {
        name: "Profile",
        icon: User,
        link:"/profile"
      },
    ],
    []
  );
  return (
    <div className="border h-screen sticky top-0 flex flex-col gap-5 bg-white">
      <Image
        src="/next.svg"
        alt=""
        className="w-[70%] px-6 py-4 text-primary"
        width={0}
        height={0}
      ></Image>
      <div className="p-2 flex flex-col gap-3">
        {tabs.map((tabObj, i) => (
          <Link
            key={i}
            className={`flex gap-3 px-4 py-2 items-center transition-all cursor-pointer rounded-md ${
              tab === tabObj.name
                ? "text-green-600 font-semibold border-l-4 border-green-500 bg-gray-100"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setTab(tabObj.name)}
            href={tabObj.link}
          >
            <tabObj.icon size={25} />
            <p className="text-lg">{tabObj.name}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-1 p-2 justify-end">
        <button
          style={{
            color: "white",
            paddingTop: "12px",
            paddingBottom: "12px",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: "semibold",
          }}
          className="bg-secondary"
        >
          Scan Plant
        </button>
        <div
          className="flex w-full gap-3 p-2 items-center transition-all hover:bg-gray-200 cursor-pointer rounded-md mb-4"
          // onClick={logoutUser}
        >
          <LogOut size={25} />
          <p className="text-lg">Log out</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
