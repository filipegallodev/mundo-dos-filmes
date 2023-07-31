import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShareIcon from "@mui/icons-material/Share";

import styles from "../../styles/MoviePage.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const FACEBOOK_API = process.env.NEXT_PUBLIC_FACEBOOK_API;

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

  if (loading)
    return (
      <main className={styles.moviePage}>
        <div>
          <div className={styles.imageCoverContainer}>
            <img className={styles.imagePlaceholder} />
          </div>

          <div className={styles.titleContainer}>
            <h2>Carregando...</h2>
            <Checkbox
              className={styles.favoriteCheckbox}
              onClick={handleFavoriteMovies}
              icon={<FavoriteBorderIcon className={styles.favoriteIcon} />}
              checkedIcon={
                <FavoriteIcon className={styles.favoriteIconChecked} />
              }
              checked={favorite ? true : false}
            />
          </div>
        </div>
        <Link href="/">
          <button className={styles.returnButton}>Voltar</button>
        </Link>
        <footer>
          <div>
            <p>
              Desenvolvido por{" "}
              <a
                href="https://filipegallo.dev/"
                target="_blank"
                rel="noreferrer"
              >
                Filipe
              </a>
              .
            </p>
          </div>
        </footer>
      </main>
    );
  if (movieData) {
    return (
      <>
        <Head>
          <title>Mundo dos Filmes | {movieData.title}</title>
          <meta
            name="description"
            content={`Mundo dos Filmes | ${movieData.title} | ${movieData.overview}`}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.moviePage}>
          <div>
            <div className={styles.imageCoverContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}`}
                alt={movieData.title}
                loading="lazy"
                className={styles.imagePlaceholder + " " + styles.image}
              />
            </div>

            <div className={styles.titleContainer}>
              <div>
                <h2>{movieData.title}</h2>
                <span>{movieData.tagline}</span>
              </div>

              <Checkbox
                className={styles.favoriteCheckbox}
                onClick={handleFavoriteMovies}
                icon={<FavoriteBorderIcon className={styles.favoriteIcon} />}
                checkedIcon={
                  <FavoriteIcon className={styles.favoriteIconChecked} />
                }
                checked={favorite ? true : false}
              />
            </div>

            <div className={styles.overviewContainer}>
              <h3>Visão Geral</h3>
              <p>
                {movieData.overview
                  ? movieData.overview
                  : "Nenhuma descrição fornecida."}
              </p>
            </div>

            <div className={styles.detailsContainer}>
              <h3>Detalhes</h3>
              <ul>
                <li>
                  <ThumbUpIcon /> {movieData.vote_average.toFixed(1)}
                </li>
                <li>
                  <AccessTimeIcon />{" "}
                  {movieData.runtime !== 0
                    ? `${Math.floor(movieData.runtime / 60)}h ` +
                      `${Math.floor(movieData.runtime % 60)}min`
                    : "?"}
                </li>
                <li>
                  <CalendarMonthIcon />{" "}
                  {movieData.release_date.replace(/(\d+)\-(\d+)\-(\d+)/g, `$1`)}
                </li>
              </ul>
            </div>

            <div className={styles.gendersContainer}>
              <h3>Gêneros</h3>{" "}
              <ul>
                {movieData.genres.map((genre: any) => (
                  <li key={genre.name}>{genre.name} </li>
                ))}
              </ul>
            </div>

            {movieWatchProviders ? (
              <>
                {movieWatchProviders.flatrate ? (
                  <div className={styles.providersContainer}>
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
                  </div>
                ) : null}
              </>
            ) : null}

            <div>
              <div className={styles.shareContainerTitle}>
                <h3>Compartilhar</h3>
                <ShareIcon />
              </div>
              <div className={styles.shareContainer}>
                <a
                  href={`https://twitter.com/intent/tweet?text=Veja%20o%20que%20estou%20assistindo:&url=https://mundo-dos-filmes.vercel.app${router.asPath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className={styles.twitterButton}>Twitter</button>
                </a>
                <a
                  href={`https://www.facebook.com/dialog/share?href=https://mundo-dos-filmes.vercel.app${router.asPath}&app_id=${FACEBOOK_API}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className={styles.facebookButton}>Facebook</button>
                </a>
                <button className={styles.copyButton} onClick={handleShareLink}>
                  Copiar Link
                </button>
              </div>
            </div>
          </div>

          <Link href="/">
            <button className={styles.returnButton}>Voltar</button>
          </Link>
          <footer>
            <div>
              <p>
                Desenvolvido por{" "}
                <a
                  href="https://filipegallo.dev/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Filipe
                </a>
                .
              </p>
            </div>
          </footer>
        </main>
      </>
    );
  } else {
    return (
      <div>
        <p>Nada encontrado.</p>
        <Link href="/">
          <button className={styles.returnButton}>Voltar</button>
        </Link>
        <footer>
          <div>
            <p>
              Desenvolvido por{" "}
              <a
                href="https://filipegallo.dev/"
                target="_blank"
                rel="noreferrer"
              >
                Filipe
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    );
  }
};

export default Movie;
