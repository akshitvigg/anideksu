"use client";

import axios from "axios";
import Image from "next/image";
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
    console.log();
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
            <p className=" bg-zinc-700 -translate-y-6">{anime.score}</p>
            <p className=" pt-1 w-52">{anime.title}</p>
          </div>
        ))}
      </div>
      <Cards />
    </div>
  );
}
