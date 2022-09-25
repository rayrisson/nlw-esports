import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo-nlw-esports.svg";
import GameBanner from "./components/GameBanner";

import "./styles/main.css";
import CreateAdModal from "./components/CreateAdModal";
import CreateAdBanner from "./components/CreateAdBanner";
import axios from "axios";
import Carousel from "./components/Carousel";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3000/games").then((response) =>
      setGames(response.data)
    );
  }, []);

  return (
    <div className="max-w-[1488px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />
      <h1 className="text-6xl text-white font-black mt-20 mb-16">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <Carousel>
        {games.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </Carousel>

      <CreateAdModal>
        <CreateAdBanner />
      </CreateAdModal>
    </div>
  );
};

export default App;
