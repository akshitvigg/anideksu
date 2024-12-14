import axios from "axios";
import { useState } from "react";

export default function GenreAnime() {
  const [anidata, setAnidata] = useState<any[]>([]);

  const getAnimebygenre = async (genreId: number) => {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?genres=${genreId}`
    );
    setAnidata(response.data.data);
  };

  return (
    <div>
      {anidata.map((ani) => (
        <div key={ani.mal_id}>
          <div>
            {ani.name}
            <img src={ani.images.jpg.image_url} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
}
