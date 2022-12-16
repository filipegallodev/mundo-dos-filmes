import Head from "next/head";
import FavoriteMovies from "../components/Movies/FavoriteMovies";
import MostPopular from "../components/Movies/MostPopular";
import SearchMovies from "../components/Movies/SearchMovies";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mundo dos Filmes | Home</title>
        <meta name="description" content="Mundo dos Filmes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main-container">
        <MostPopular />
        <FavoriteMovies />
        <SearchMovies />
      </main>
    </>
  );
}
