import React from "react";
import { useRecoilState } from "recoil";

import Sidebar from "./Sidebar";
import Body from "./Body";
import Right from "./Right";
import { playingTrackState } from "../atoms/playerAtom";

const Dashboard = () => {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body chooseTrack={chooseTrack} />
      <Right />
    </main>
  );
};

export default Dashboard;
