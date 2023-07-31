import Head from "next/head";
import FavoriteMovies from "../components/Movies/FavoriteMovies";
import MostPopular from "../components/Movies/MostPopular";
import SearchMovies from "../components/Movies/SearchMovies";
import Footer from "../components/Footer/Footer";

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
        <h1 className="main-title">Mundo dos Filmes</h1>
        <MostPopular />
        <FavoriteMovies />
        <SearchMovies />
      </main>

      <Footer />
    </>
  );
}
