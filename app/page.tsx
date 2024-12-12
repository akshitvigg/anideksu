import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const inputRef = useRef("");
  const [anbidata, setAnidata] = useState("");

  const getAnimedata = async () => {
    const response = await axios.get(
      "https://api.jikan.moe/v4/anime?q=onepiece"
    );

    console.log();
  };

  return <div></div>;
}
