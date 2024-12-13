"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Video } from "lucide-react";
import pika from "../assets/pikachu-running.gif";
import naruto from "../assets/2r6C.gif";
import Image from "next/image";

export default function Trending() {
  const [aniData, setAnidata] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [chance, setChance] = useState<number>(0.5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setChance(Math.random());
    const getTrending = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?trending&limit=10`
      );
      setAnidata(response.data.data);
      setLoading(false);
    };
    getTrending();
    chance;
    console.log(chance);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div>
      {!loading ? (
        <div
          ref={scrollContainerRef}
          className=" flex overflow-x-auto scrollbar-hide space-x-4 px-10 py-10"
        >
          <button
            className=" bg-yellow-300 rounded-full"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={32} color="black" />
          </button>
          <button
            className=" bg-yellow-300 rounded-full"
            onClick={() => scroll("right")}
          >
            <ChevronRight color="black" size={32} />
          </button>
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
                    <span className="pl-2">airing</span>
                  ) : (
                    <span className="  w-16">finished</span>
                  )}
                </p>
              </div>
              <p className=" font-bold -translate-y-4 w-52">{anime.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className=" flex justify-center ">
          {chance > 0.5 ? (
            <Image className=" mt-64" src={naruto} width={200} alt="loading" />
          ) : (
            <Image className=" mt-80" src={pika} width={100} alt="loading" />
          )}
        </div>
      )}
    </div>
  );
}
