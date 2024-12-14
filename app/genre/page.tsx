"use client";
import axios from "axios";
import { useEffect, useState } from "react";

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
        {anidata.map((ani) => (
          <div className=" col-span-1" key={ani.mal_id}>
            name : {ani.title}
            <img src={ani.images.jpg.image_url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
