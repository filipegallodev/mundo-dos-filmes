import { useRouter } from "next/router";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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
    <div>
      <h2>SearchMovies</h2>
      <form>
        <input type="text" id="search-movie" ref={searchInput} />
        <button onClick={handleSearch}>Pesquisar</button>
      </form>
      {searchMovieData ? (
        <>
          <span>
            Mostrando {searchMovieData.total_results} resultados para {'"'}
            {search}
            {'"'}:.
          </span>
          <ul>
            {searchMovieData.results.map((movie: any) => (
              <li key={movie.id} id={movie.id} onClick={handleMovieRoute}>
                {movie.title}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Nada encontrado</p>
      )}
    </div>
  );
};

export default SearchMovies;
