import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";

import Search from "./Search";
import Poster from "./Poster";
import Track from "./Track";
import spotifyApi from "../lib/spotify";

const Body = ({ chooseTrack }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    debouncedSearchTracks(search);
  }, [search, accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0]?.name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });
  }, []);

  const debouncedSearchTracks = useCallback(
    debounce((searchTerm) => {
      spotifyApi.searchTracks(searchTerm).then((res) => {
        setSearchResults(
          res.body.tracks.items.map((track) => {
            return {
              id: track.id,
              artist: track.artists[0]?.name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0].url,
              popularity: track.popularity,
            };
          })
        );
      });
    }, 500),
    []
  );

  return (
    <section className="bg-black ml-24 py-4 space-y-8 max-w-[1600px] flex-grow mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div
        className="grid overflow-y-scroll scrollbar-hide h-64 py-4 grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-x-4
        gap-y-8 p-4"
      >
        {searchResults.length === 0
          ? newReleases
              .slice(0, 6)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 6)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
      </div>

      <div className="flex gap-x-8">
        {/*  Genres */}
        <div className="flex-none max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-Hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
            <button className="btn">All Genres</button>
          </div>
        </div>

        {/*  Tracks*/}
        <div className="flex-1">
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? "New Releases" : "Tracks"}
          </h2>
          <div
            className="space-y-3 border-3 border-[#262626] rounded-2xl p-3 bg-[#0d0d0d] overflow-y-scroll h-[1000px] 
              md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500"
          >
            {searchResults.length === 0
              ? newReleases
                  .slice(6, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(6, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
