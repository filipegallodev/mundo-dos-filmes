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

  return (
    <div>
      <h2>Populares no momento</h2>
      <div className="movies-container">
        {popularMoviesData ? (
          <>
            <ul className="movies-carousel" ref={carousel}>
              {popularMoviesData.map((movie: any) => (
                <li key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    alt={movie.title}
                    id={movie.id}
                    onClick={handleMovieRoute}
                    loading="lazy"
                    className="image-placeholder"
                  />
                </li>
              ))}
            </ul>
            <div className="movies-container-buttons">
              <button onClick={carouselLeftClick}>Anterior</button>
              <button onClick={carouselRightClick}>Próximo</button>
            </div>
          </>
        ) : loading ? (
          <>
            <ul className="movies-carousel" ref={carousel}>
              {Array.from(new Array(10)).map((item, index) => (
                <li key={index}>
                  <img className="image-placeholder" />
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
      </div>
    </div>
  );
};

export default MostPopular;
