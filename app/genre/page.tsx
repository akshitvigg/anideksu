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
    <div className=" flex pt-4 ">
      <div className="  mr-4 grid gap-4 grid-cols-5">
        {anidata.map((anime) => (
          <div className=" col-span-1" key={anime.mal_id}>
            <div className="relative w-40 h-52 overflow-hidden rounded-md border-2 border-yellow-300">
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
            </div>
            <p className="font-bold -translate-y-4 w-44">{anime.title}</p>
          </div>
        ))}
      </div>

      <div className=" h-60 rounded-xl  text-sm w-72 bg-[#1c2631] ">
        <p className=" pl-3 font-bold border-b text-xl">genre</p>
        <div className=" flex">
          <div className=" flex-col border-r  h-52 flex w-28">
            <button
              className=" pt-4"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(1);
              }}
            >
              Action
            </button>

            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(2);
              }}
            >
              Adventure
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(4);
              }}
            >
              Comedy
            </button>
            <button
              className=" pt-3 "
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(46);
              }}
            >
              Award Winning
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(28);
              }}
            >
              Boys Love
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(8);
              }}
            >
              Drama
            </button>
          </div>
          <div className=" w-24 border-r flex flex-col">
            <button
              className=" pt-4"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(10);
              }}
            >
              Fantasy
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(26);
              }}
            >
              Girls Love
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(47);
              }}
            >
              Gourmet
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(7);
              }}
            >
              Mystery
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(14);
              }}
            >
              Horror
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(22);
              }}
            >
              Romance
            </button>
          </div>
          <div className=" w-24 flex flex-col">
            <button
              className=" pt-4"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(24);
              }}
            >
              Sci-Fi
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(36);
              }}
            >
              Slice of Life
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(30);
              }}
            >
              Sports
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(37);
              }}
            >
              Supernatural
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(41);
              }}
            >
              Suspense
            </button>
            <button
              className=" pt-3"
              onClick={() => {
                setCurrPage(1);
                setcurrGenre(3);
              }}
            >
              Racing
            </button>
          </div>
        </div>
      </div>

      {/* <button onClick={handlePrevPage} disabled={currPage === 1}>
          prev
        </button>

        <button onClick={handleNextPage} disabled={!hasNextPage}>
          next
        </button> */}
    </div>
  );
}
