import Head from "next/head";
import FavoriteMovies from "../components/Movies/FavoriteMovies";
import MostPopular from "../components/Movies/MostPopular";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mundo dos Filmes</title>
        <meta name="description" content="Mundo dos filmes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MostPopular />
        <FavoriteMovies />
      </main>
    </>
  );
}
