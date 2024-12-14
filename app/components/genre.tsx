"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Star,
  Video,
  ChevronLeftCircle,
  ChevronRightCircle,
} from "lucide-react";
import Image from "next/image";
import pika from "../assets/pikachu-running.gif";
import naruto from "../assets/2r6C.gif";

export default function GenreAnime() {
  const [anidata, setAnidata] = useState<any[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currGenre, setcurrGenre] = useState<number>(1);
  const [popularanime, setPopularanime] = useState<any[]>([]);
  const [genre, setgenre] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const chance = Math.random();

  interface Anime {
    mal_id: number;
    title: string;
    genres: { mal_id: number; name: string }[];
  }

  const getAnimeBygenre = async (genreId: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${currPage}`
      );
      setAnidata(response.data.data);
      setHasNextPage(response.data.pagination.has_next_page);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getPopular = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ data: Anime[] }>(
          `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=1&limit=10`
        );
        setPopularanime(response.data.data);
        const allGenres = response.data.data.map((anime) => anime.genres);
        setgenre(allGenres);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getPopular();
  }, []);

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
          <div className=" flex pt-4 ">
            <div className="pl-12 pr-4 grid mb-3 grid-cols-5">
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
                      <Star
                        className="pr-1"
                        fill="yellow"
                        color="yellow"
                        size={18}
                      />
                      {anime.score}
                    </p>
                    <p className="ml-2 pl-2 rounded-md backdrop-blur-xl text-black bg-green-400 font-bold text-sm items-center w-12 flex -translate-y-6">
                      <Video className="pr-1" color="black" size={18} />
                      {anime.episodes}
                    </p>
                  </div>
                  <p className="hover:text-yellow-300 -translate-y-4 w-44">
                    {anime.title}
                  </p>
                </div>
              ))}

              <button
                className={` ${
                  currPage === 1 ? "text-gray-600 hover:cursor-not-allowed" : ""
                }  translate-x-96`}
                onClick={handlePrevPage}
                disabled={currPage === 1}
              >
                <ChevronLeftCircle size={38} />
              </button>

              <button
                className=" translate-x-72"
                onClick={handleNextPage}
                disabled={!hasNextPage}
              >
                <ChevronRightCircle size={38} />
              </button>
            </div>

            <div>
              <div className=" h-64 rounded-xl  text-sm w-[310px] bg-[#1c2631] ">
                <p className=" px-5 py-2 text-yellow-300 font-bold border-b border-gray-600 text-xl">
                  Genres
                </p>
                <div className=" flex">
                  <div className=" flex-col border-r border-gray-600 h-52 flex w-28">
                    <button
                      className=" hover:text-yellow-300 pt-4"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(1);
                      }}
                    >
                      Action
                    </button>

                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(2);
                      }}
                    >
                      Adventure
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(4);
                      }}
                    >
                      Comedy
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3 "
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(46);
                      }}
                    >
                      Award Winning
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(28);
                      }}
                    >
                      Boys Love
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(8);
                      }}
                    >
                      Drama
                    </button>
                  </div>
                  <div className=" w-24 border-r border-gray-600 flex flex-col">
                    <button
                      className=" hover:text-yellow-300 pt-4"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(10);
                      }}
                    >
                      Fantasy
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(26);
                      }}
                    >
                      Girls Love
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(47);
                      }}
                    >
                      Gourmet
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(7);
                      }}
                    >
                      Mystery
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(14);
                      }}
                    >
                      Horror
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
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
                      className=" hover:text-yellow-300 pt-4"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(24);
                      }}
                    >
                      Sci-Fi
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(36);
                      }}
                    >
                      Slice of Life
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(30);
                      }}
                    >
                      Sports
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(37);
                      }}
                    >
                      Supernatural
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
                      onClick={() => {
                        setCurrPage(1);
                        setcurrGenre(41);
                      }}
                    >
                      Suspense
                    </button>
                    <button
                      className=" hover:text-yellow-300 pt-3"
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
              <div className=" mt-5 bg-[#1c2631]  rounded-xl h-[1140px] mb-5">
                <p className=" text-2xl py-3 font-bold border-b border-gray-600 px-4">
                  Most Popular
                </p>
                <div>
                  {popularanime.map((anime) => (
                    <div key={anime.mal_id}>
                      <div className=" mt-5 mb-5   border-b border-gray-600  flex">
                        <img
                          className=""
                          src={anime.images.jpg.image_url}
                          width={60}
                          alt=""
                        />
                        <div>
                          <p className=" pl-4 text-wrap">{anime.title}</p>
                          <div className=" pl-4 pt-2 flex gap-1">
                            {anime.genres.map((g: any) => (
                              <p className="  text-xs flex-row" key={g.mal_id}>
                                {g.name}
                              </p>
                            ))}
                          </div>
                          <div className=" pt-2 pl-4 items-center flex">
                            <Star size={16} fill="yellow" color="yellow" />{" "}
                            <p className="  pl-2">{anime.score}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
