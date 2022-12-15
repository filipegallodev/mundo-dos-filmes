import { useRouter } from "next/router";
import React from "react";

const MostPopular = () => {
  const router = useRouter();

  function handleMovieRoute({ target }: any) {
    const movieId = target.getAttribute("id");
    router.push(`/movie/${movieId}`);
  }

  return (
    <div>
      <h2>MostPopular</h2>
      <div>
        <ul>
          <li id="297761" onClick={handleMovieRoute}>
            Esquadrão Suicida
          </li>
          <li id="324668" onClick={handleMovieRoute}>
            Jason Bourne
          </li>
          <li id="209112" onClick={handleMovieRoute}>
            Batman vs Superman: A Origem da Justiça
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MostPopular;
