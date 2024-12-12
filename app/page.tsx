"use client";

import axios from "axios";
import { Star, Subtitles, Video } from "lucide-react";
import { useRef, useState } from "react";
import { Cards } from "./components/cards";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [aniData, setAnidata] = useState<any[]>([]);
  const inputRef = useRef<string | any>("");
  const getAnimedata = async () => {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${inputRef.current.value}`
    );
    setAnidata(response.data.data);
  };

  return (
    <div className="">
      <div className="  flex items-center justify-center">
        <input
          ref={inputRef}
          className=" text-black p-3 w-96 mt-32"
          type="text"
          placeholder="anime name"
        />
        <button onClick={getAnimedata} className=" mt-32 p-3 bg-yellow-600">
          search
        </button>
      </div>
      <div className=" ml-10 pt-10 grid grid-cols-5">
        {aniData.map((anime) => (
          <div
            className=" transition-all duration-200 hover:scale-95 pt-6 col-span-1"
            key={anime.mal_id}
          >
            <img
              src={anime.images.jpg.image_url}
              alt="animephoto"
              width={200}
            />
            <div className=" flex">
              <p className="ml-2 pl-1 rounded-md backdrop-blur-xl text-black  bg-cyan-400 font-bold text-sm items-center w-14 flex -translate-y-6">
                <Star
                  className="pr-1"
                  fill="yellow"
                  color="yellow "
                  size={18}
                />
                {anime.score}
              </p>
              <p className="ml-2 pl-2 rounded-md backdrop-blur-xl text-black  bg-green-400 font-bold text-sm items-center w-12 flex -translate-y-6">
                <Video className="pr-1" color="black" size={18} />
                {anime.episodes}
              </p>
              <p className="ml-2 pl-1 pr-1 rounded-md  bg-red-400 text-black    backdrop-blur-lg font-bold text-sm items-center w-16 flex -translate-y-6">
                {anime.airing ? (
                  <p className="pl-2">airing</p>
                ) : (
                  <p className="  w-16">finished</p>
                )}
              </p>
            </div>
            <p className=" pt-1 w-52">{anime.title}</p>
          </div>
        ))}
      </div>
      <Cards />
    </div>
  );
}
