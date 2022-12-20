import { useRouter } from "next/router";
import React from "react";

import noCover from "../../public/no-cover.jpg";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const FavoriteMovies = () => {
  const router = useRouter();

  const carousel = React.useRef<any>();

  const [favoriteMoviesData, setFavoriteMoviesData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchFavoriteMovies(arrayLocalFavorites: any) {
    const arrayFavoriteMovies = await Promise.all(
      arrayLocalFavorites.map(async (favoriteId: any) => {
        try {
          setLoading(true);
          const res = await fetch(
            `${API_URL}/movie/${favoriteId}?api_key=${API_KEY}&language=pt-BR`
          );
          const data = await res.json();
          return data;
        } catch (err) {
          console.log("Seguinte erro encontrado: " + err);
        } finally {
          setLoading(false);
        }
      })
    );
    setFavoriteMoviesData(arrayFavoriteMovies);
  }

  React.useEffect(() => {
    const jsonLocalFavorites = localStorage.getItem("favorite-movies");
    if (jsonLocalFavorites) {
      const arrayLocalFavorites = JSON.parse(jsonLocalFavorites);
      fetchFavoriteMovies(arrayLocalFavorites);
    }
  }, []);

  function handleMovieRoute({ target }: any) {
    const movieId = target.getAttribute("id");
    router.push(`/movie/${movieId}`);
  }

  // Move carousel to the left
  function carouselLeftClick(e: any) {
    e.preventDefault();
    carousel.current.scrollLeft -=
      window.innerWidth -
      (window.innerWidth <= 500 ? 80 : window.innerWidth < 800 ? 180 : 480);
  }

  // Move carousel to the right
  function carouselRightClick(e: any) {
    e.preventDefault();
    carousel.current.scrollLeft +=
      window.innerWidth -
      (window.innerWidth <= 500 ? 110 : window.innerWidth < 800 ? 240 : 540);
  }

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <h2>Meus favoritos</h2>
      <ul className="movies-container">
        {favoriteMoviesData ? (
          <>
            <ul className="movies-carousel" ref={carousel}>
              {favoriteMoviesData.map((movie: any) => (
                <li key={movie.id}>
                  <img
                    src={
                      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                      
                    alt={movie.title}
                    id={movie.id}
                    onClick={handleMovieRoute}
                  />
                </li>
              ))}
            </ul>
            <div className="movies-container-buttons">
              <button onClick={carouselLeftClick}>Anterior</button>
              <button onClick={carouselRightClick}>Próximo</button>
            </div>
          </>
        ) : (
          <p>Nada encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default FavoriteMovies;
