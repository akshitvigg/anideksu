"use client";

import axios from "axios";
import { Star, Video, Search } from "lucide-react";
import { useRef, useState } from "react";
import { Cards } from "./components/cards";
import Link from "next/link";
import Image from "next/image";
import pika from "./assets/pikachu-running.gif";
import naruto from "./assets/2r6C.gif";
import { Trending } from "./components/trending";

export default function Home() {
  const [aniData, setAnidata] = useState<any[]>([]);
  const inputRef = useRef<string | any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chance = Math.random();

  const getAnimedata = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${inputRef.current.value}`
    );
    setAnidata(response.data.data);
    setLoading(false);
  };

  return (
    <div className="">
      {loading ? (
        <div className=" flex justify-center ">
          {chance > 0.5 ? (
            <Image className=" mt-64" src={naruto} width={200} alt="loading" />
          ) : (
            <Image className=" mt-80" src={pika} width={100} alt="loading" />
          )}
        </div>
      ) : (
        <div>
          <div className=" pl-14 pt-3   flex justify-between pr-14  items-center ">
            <p className=" font-bold text-4xl">Anitaro</p>

            <p> home </p>
            <Link href={"/trending"}>
              <button>trending</button>
            </Link>
            <button>popular</button>
            <div className=" flex items-center">
              <input
                ref={inputRef}
                className=" rounded-3xl mr-2 text-black p-3 w-96 "
                type="text"
                placeholder="anime name"
              />
              <button
                onClick={getAnimedata}
                className=" rounded-full  p-3 bg-yellow-300"
              >
                <Search color="#161e27" />
              </button>
            </div>
          </div>
          <Trending />
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
        </div>
      )}
    </div>
  );
}
