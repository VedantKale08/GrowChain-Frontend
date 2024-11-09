"use client";
import { tabsStore } from "@/store/tabStore";
import { userStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

function Navbar() {
  const setTab = tabsStore((state) => state.setTab);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(()=>{
    setUser(JSON.parse(getCookie("userData")));
  },[])

  return (
    <div className="border h-[70px] top-0 bg-white flex justify-end items-center z-40">
      <div className="mr-14 flex gap-5">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            setTab("Profile");
            router.push('/profile')
          }}
        >
          <img
            src={`/assets/Images/farmerIcon.png`}
            alt=""
            className="w-12 h-12 rounded-full"
          ></img>
          {/* <div className="bg-orange-500 w-10 h-10 rounded-full"></div> */}
          <p className="text-lg">
            {user?.fname} {user?.lname}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
