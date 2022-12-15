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

  React.useEffect(() => {
    async function fetchingMovieData() {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
        );
        const data = await res.json();
        setMovieData(data);
      } catch (err) {
        console.log("Seguinte erro encontrado:" + err);
      } finally {
        setLoading(false);
      }
    }
    fetchingMovieData();
  }, [movieId]);

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      {movieData ? (
        <div>
          <h2>
            {movieData.title} | ID: {movieId}
          </h2>
        </div>
      ) : (
        <p>Nada encontrado.</p>
      )}
      <Link href="/">Voltar</Link>
    </div>
  );
};

export default Movie;
