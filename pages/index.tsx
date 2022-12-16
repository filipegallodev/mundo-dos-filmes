import Head from "next/head";
import FavoriteMovies from "../components/Movies/FavoriteMovies";
import MostPopular from "../components/Movies/MostPopular";
import SearchMovies from "../components/Movies/SearchMovies";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mundo dos Filmes | Home</title>
        <meta name="description" content="Mundo dos Filmes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MostPopular />
        <FavoriteMovies />
        <SearchMovies />
      </main>
    </>
  );
}
