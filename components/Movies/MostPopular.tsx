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
          <li id="1" onClick={handleMovieRoute}>
            Filme 1
          </li>
          <li id="2" onClick={handleMovieRoute}>
            Filme 2
          </li>
          <li id="3" onClick={handleMovieRoute}>
            Filme 3
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MostPopular;
