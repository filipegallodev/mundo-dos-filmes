import { useRouter } from "next/router";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const FavoriteMovies = () => {
  const router = useRouter();

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

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <h2>FavoriteMovies</h2>
      <ul>
        {favoriteMoviesData ? (
          <ul>
            {favoriteMoviesData.map((movie: any) => (
              <li key={movie.id} id={movie.id} onClick={handleMovieRoute}>
                {movie.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nada encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default FavoriteMovies;
