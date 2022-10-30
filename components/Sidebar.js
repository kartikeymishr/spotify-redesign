import React from "react";
import Image from "next/image";
import {
  HiHome,
  HiMicrophone,
  HiChartBar,
  HiClock,
  HiEllipsisHorizontal,
} from "react-icons/hi2";
import { RiCompassDiscoverFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <section
      className="fixed top-0 z-40 flex flex-col 
      items-center bg-black w-[90px] h-screen space-y-8 pt-[16px]"
    >
      <Image
        src="https://rb.gy/xkacau"
        width={56}
        height={56}
        objectFit="contain"
      />
      <div className="flex flex-col space-y-8">
        <HiHome className="sidebarIcon text-white opacity-[0.85]" />
        <RiCompassDiscoverFill className="sidebarIcon" />
        <HiMicrophone className="sidebarIcon" />
        <HiChartBar className="sidebarIcon" />
        <HiClock className="sidebarIcon" />
        <HiEllipsisHorizontal className="sidebarIcon" />
      </div>
    </section>
  );
};

export default Sidebar;
