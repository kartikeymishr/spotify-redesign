import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Sidebar from "./Sidebar";
import Body from "./Body";
import Right from "./Right";
import { playingTrackState } from "../atoms/playerAtom";
import { useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";
import Player from "./Player";

const Dashboard = () => {
  const { data: session } = useSession();
  const { accessToken } = session.user;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <Body chooseTrack={chooseTrack} />
      <Right chooseTrack={chooseTrack} />

      {showPlayer && (
        <div className="fixed bottom-0 right-0 left-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
