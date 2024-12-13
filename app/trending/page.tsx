"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Star, Video } from "lucide-react";

export default function Trending() {
  const [aniData, setAnidata] = useState<any[]>([]);

  useEffect(() => {
    const getTrending = async () => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?trending`
      );
      setAnidata(response.data.data);
    };
    getTrending();
  }, []);

  return (
    <div>
      <div className=" ml-32 pt-10 gap-3 mr-24 grid grid-cols-5">
        {aniData.map((anime) => (
          <div className=" pt-3 col-span-1" key={anime.mal_id}>
            <div className=" relative overflow-hidden object-center  hover:object-cover rounded-md border-2 border-yellow-300">
              <img
                className=" w-full h-full object-cover rounded-md transition-transform duration-500 transform hover:scale-110   "
                src={anime.images.jpg.image_url}
                alt="animephoto"
                width={200}
              />
            </div>
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
            <p className=" font-bold -translate-y-4 w-52">{anime.title}</p>
          </div>
        ))}
      </div>
      0
    </div>
  );
}
