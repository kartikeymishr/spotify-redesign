import React from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";

const Poster = ({ track, chooseTrack }) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === playingTrack.uri) {
      setPlay(!play);
    }
  };

  return (
    <div
      className="w-[320px] h-[220px] lg:w-[220px] lg:h-[220px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer
      hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
      onClick={handlePlay}
    >
      <img
        src={track.albumUrl}
        alt=""
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />

      <div className="absolute bottom-10 inset-x-0 flex items-center justify-between pl-3">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {track.uri === playingTrack.uri && play ? (
            <BsPauseFill className="text-xl" />
          ) : (
            <BsPlayFill className="text-xl" />
          )}
        </div>
        <div className="text-[14px] ml-2">
          <h4 className="font-extrabold truncate w-40">{track.title}</h4>
          <h6>{track.artist}</h6>
        </div>
      </div>
    </div>
  );
};

export default Poster;
