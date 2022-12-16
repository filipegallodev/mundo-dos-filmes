import { useRouter } from "next/router";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const MostPopular = () => {
  const router = useRouter();

  const carousel = React.useRef<any>();

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

  // Move o carousel para a esquerda
  function carouselLeftClick(e: any) {
    e.preventDefault();
    carousel.current.scrollLeft -= window.innerWidth + 180;
  }

  // Move o carousel para a direita
  function carouselRightClick(e: any) {
    e.preventDefault();
    console.log(window.innerWidth);
    carousel.current.scrollLeft +=
      window.innerWidth - (window.innerWidth <= 500 ? 120 : 480);
  }

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <h2>Populares no momento</h2>
      <div className="teste">
        {popularMoviesData ? (
          <>
            <ul className="movies-container-horizontal" ref={carousel}>
              {popularMoviesData.map((movie: any) => (
                <li key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                    style={{ height: "360px" }}
                    id={movie.id}
                    onClick={handleMovieRoute}
                  />
                </li>
              ))}
            </ul>
            <button onClick={carouselLeftClick}>Anterior</button>
            <button onClick={carouselRightClick}>Próximo</button>
          </>
        ) : (
          <p>Nada encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default MostPopular;
