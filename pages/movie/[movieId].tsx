import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Movie = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const [movieData, setMovieData] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);

  React.useEffect(() => {
    async function fetchMovieData() {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
        );
        const data = await res.json();
        setMovieData(data);
      } catch (err) {
        console.log("Seguinte erro encontrado: " + err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieData();
  }, [movieId]);

  function handleFavoriteMovies() {
    const jsonLocalFavorites = localStorage.getItem("favorite-movies");

    if (jsonLocalFavorites) {
      const arrayLocalFavorites = JSON.parse(jsonLocalFavorites);

      if (arrayLocalFavorites.includes(movieData.id)) {
        var newFavorites = addFavorite(arrayLocalFavorites);
      } else {
        var newFavorites = removeFavorite(arrayLocalFavorites);
      }

      localStorage.setItem("favorite-movies", JSON.stringify(newFavorites));
    }

    if (!jsonLocalFavorites) {
      localStorage.setItem("favorite-movies", JSON.stringify([movieData.id]));
    }

    handleFavoriteIcon();
  }

  function addFavorite(arrayLocalFavorites: any) {
    return arrayLocalFavorites.filter(
      (favorite: any) => favorite !== movieData.id
    );
  }

  function removeFavorite(arrayLocalFavorites: any) {
    arrayLocalFavorites.push(movieData.id);
    return arrayLocalFavorites.slice();
  }

  React.useEffect(() => {
    handleFavoriteIcon();
  }, [movieData]);

  function handleFavoriteIcon() {
    const jsonLocalFavorites = localStorage.getItem("favorite-movies");

    if (jsonLocalFavorites && movieData) {
      const arrayLocalFavorites = JSON.parse(jsonLocalFavorites);

      if (arrayLocalFavorites.includes(movieData.id)) {
        return setFavorite(true);
      }
    }

    return setFavorite(false);
  }

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      {movieData ? (
        <div>
          <h2>
            {movieData.title} | ID: {movieId}
          </h2>
          <p>
            Lançamento:{" "}
            {movieData.release_date.replace(
              /(\d+2)\-(\d+)\-(\d+)/g,
              `$3/$2/$1`
            )}
          </p>
          <p>Gênero: {movieData.genres[0].name}</p>
          <p>Nota: {movieData.vote_average.toFixed(1)}</p>
          <p>Favoritado: {favorite ? "Sim" : "Não"}</p>
          <p>{movieData.overview}</p>
          <button onClick={handleFavoriteMovies}>Favoritar</button>
        </div>
      ) : (
        <p>Nada encontrado.</p>
      )}
      <Link href="/">Voltar</Link>
    </div>
  );
};

export default Movie;
