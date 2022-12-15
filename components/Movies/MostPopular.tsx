import { useRouter } from "next/router";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const MostPopular = () => {
  const router = useRouter();

  const [popularMoviesData, setPopularMoviesData] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchPopularMoviesData() {
      try {
        setLoading(true);
        const res =
          await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1
        `);
        const data = await res.json();
        setPopularMoviesData(data.results);
      } catch (err) {
        console.log("Seguinte erro encontrado: " + err);
      } finally {
        setLoading(false);
      }
    }
    fetchPopularMoviesData();
  }, []);

  function handleMovieRoute({ target }: any) {
    const movieId = target.getAttribute("id");
    router.push(`/movie/${movieId}`);
  }

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <h2>MostPopular</h2>
      <div>
        <ul>
          {popularMoviesData ? (
            popularMoviesData.map((movie: any) => (
              <li key={movie.id} id={movie.id} onClick={handleMovieRoute}>
                {movie.title}
              </li>
            ))
          ) : (
            <p>Nada encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MostPopular;
