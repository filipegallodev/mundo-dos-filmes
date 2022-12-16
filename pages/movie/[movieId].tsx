import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Movie = () => {
  const router = useRouter();
  const [selectedMovieId, setSelectedMovieId] = React.useState<any>();

  React.useEffect(() => {
    const { movieId } = router.query;
    if (movieId) {
      setSelectedMovieId(movieId);
    }
  }, [router]);

  const [movieData, setMovieData] = React.useState<any>();
  const [movieWatchProviders, setMovieWatchProviders] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);

  React.useEffect(() => {
    if (!selectedMovieId) return;

    async function fetchMovieData() {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/movie/${selectedMovieId}?api_key=${API_KEY}&language=pt-BR`
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

    async function fetchMovieWatchProviders() {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_URL}/movie/${selectedMovieId}/watch/providers?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovieWatchProviders(data.results.BR);
      } catch (err) {
        console.log("Seguinte erro encontrado: " + err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieWatchProviders();
  }, [selectedMovieId]);

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

  function handleShareLink() {
    navigator.clipboard.writeText(
      `https://mundo-dos-filmes.vercel.app${router.asPath}`
    );
  }

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      {movieData ? (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
            alt={movieData.title}
            style={{
              width: "100%",
              maxWidth: "1200px",
              height: "auto",
            }}
          />
          <h2>{movieData.title}</h2>
          <p>{movieData.tagline}</p>
          <p>
            Duração:{Math.floor(movieData.runtime / 60)} horas{" "}
            {Math.floor(movieData.runtime % 60)} minutos
          </p>
          <h3>Detalhes</h3>
          <p>
            Ano: {movieData.release_date.replace(/(\d+)\-(\d+)\-(\d+)/g, `$1`)}
          </p>
          <p>
            Gênero:{" "}
            {movieData.genres.map((genre: any) => (
              <span key={genre.name}>{genre.name} </span>
            ))}
          </p>
          <p>Nota: {movieData.vote_average.toFixed(1)}</p>
          <p>Favoritado: {favorite ? "Sim" : "Não"}</p>
          <p>
            {movieData.overview
              ? movieData.overview
              : "Nenhuma descrição fornecida."}
          </p>
          {movieWatchProviders ? (
            <>
              {movieWatchProviders.flatrate ? (
                <>
                  <h3>Onde assistir</h3>
                  <ul>
                    {movieWatchProviders.flatrate.map(
                      (rentProvider: any, index: any) => (
                        <li key={index}>
                          <Image
                            src={`https://image.tmdb.org/t/p/original${rentProvider.logo_path}`}
                            alt={rentProvider.provider_name}
                            width={100}
                            height={100}
                          />
                        </li>
                      )
                    )}
                  </ul>
                  <span>Fonte: JustWatch</span>
                </>
              ) : null}
            </>
          ) : null}
          <h3>Informações extras</h3>
          <p>
            Orçamento:{" "}
            {movieData.budget === 0
              ? "Sem dados de orçamento."
              : `R$ ${movieData.budget.toLocaleString("pt-BR")},00`}
          </p>
          <p>
            Receita:{" "}
            {movieData.revenue === 0
              ? "Sem dados de receita."
              : `R$ ${movieData.revenue.toLocaleString("pt-BR")},00`}
          </p>
          <button onClick={handleShareLink}>Compartilhar</button>
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
