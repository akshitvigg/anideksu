"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Star, Video } from "lucide-react";
export default function GenreAnime() {
  const [anidata, setAnidata] = useState<any[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currGenre, setcurrGenre] = useState<number>(1);

  const getAnimeBygenre = async (genreId: number) => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${currPage}`
      );
      setAnidata(response.data.data);
      setHasNextPage(response.data.pagination.has_next_page);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAnimeBygenre(currGenre);
  }, [currPage, currGenre]);

  const handlePrevPage = () => {
    if (currPage > 1) {
      setCurrPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div className=" space-x-5">
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(1);
          }}
        >
          Action
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(2);
          }}
        >
          Adventure
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(5);
          }}
        >
          Avant Garde
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(46);
          }}
        >
          Award Winning
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(28);
          }}
        >
          Boys Love
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(4);
          }}
        >
          Comedy
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(8);
          }}
        >
          Drama
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(10);
          }}
        >
          Fantasy
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(26);
          }}
        >
          Girls Love
        </button>
        <button
          onClick={() => {
            setCurrPage(1);
            setcurrGenre(47);
          }}
        >
          Gourmet
        </button>
        <button onClick={handlePrevPage} disabled={currPage === 1}>
          prev
        </button>

        <button onClick={handleNextPage} disabled={!hasNextPage}>
          next
        </button>
      </div>
      <div className=" grid grid-cols-5">
        {anidata.map((anime) => (
          <div className="pt-3 col-span-1" key={anime.mal_id}>
            <div className="relative h-60 overflow-hidden rounded-md border-2 border-yellow-300">
              <img
                className="w-full h-full object-cover rounded-md transition-transform duration-500 transform hover:scale-110"
                src={anime.images.jpg.image_url}
                alt="animephoto"
                width={200}
              />
            </div>

            <div className="flex">
              <p className="ml-2 pl-1 rounded-md backdrop-blur-xl text-black bg-cyan-400 font-bold text-sm items-center w-14 flex -translate-y-6">
                <Star className="pr-1" fill="yellow" color="yellow" size={18} />
                {anime.score}
              </p>
              <p className="ml-2 pl-2 rounded-md backdrop-blur-xl text-black bg-green-400 font-bold text-sm items-center w-12 flex -translate-y-6">
                <Video className="pr-1" color="black" size={18} />
                {anime.episodes}
              </p>
              <p className="ml-2 pl-1 pr-1 rounded-md bg-red-400 text-black backdrop-blur-lg font-bold text-sm items-center w-16 flex -translate-y-6">
                {anime.airing ? (
                  <span className="pl-2">airing</span>
                ) : (
                  <span className="w-16">finished</span>
                )}
              </p>
            </div>
            <p className="font-bold -translate-y-4 w-52">{anime.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
