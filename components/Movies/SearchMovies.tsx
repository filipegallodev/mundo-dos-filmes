import { useRouter } from "next/router";
import React from "react";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "a1de05a3f9e92d77d658807c765e2345";

const SearchMovies = () => {
  const router = useRouter();

  const [search, setSearch] = React.useState();
  const [searchMovieData, setSearchMovieData] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  const searchInput = React.useRef<any>();

  React.useEffect(() => {
    async function fetchSearchMovie() {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&&query=${search}`
        );
        const data = await res.json();
        setSearchMovieData(data);
      } catch (err) {
        console.log("Seguinte erro encontrado: " + err);
      } finally {
        setLoading(false);
      }
    }

    if (search) {
      fetchSearchMovie();
    }
  }, [search]);

  function handleSearch(e: any) {
    e.preventDefault();
    setSearch(searchInput.current.value);
  }

  function handleMovieRoute({ target }: any) {
    const movieId = target.getAttribute("id");
    router.push(`/movie/${movieId}`);
  }

  if (loading) return <p>Carregando...</p>;
  return (
    <div className="movies-search">
      <h2>Pesquisa de filmes</h2>
      <form>
        <input
          type="text"
          id="search-movie"
          ref={searchInput}
          placeholder="Nome do filme..."
          required
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </form>
      {searchMovieData ? (
        <>
          <p>
            Mostrando <strong>{searchMovieData.total_results}</strong>{" "}
            resultados para {'"'}
            {search}
            {'"'}:
          </p>
          <ul className="movies-results-container">
            {searchMovieData.results.map((movie: any) => (
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
        </>
      ) : (
        searchInput.length > 0 && <p>Nada encontrado</p>
      )}
    </div>
  );
};

export default SearchMovies;
