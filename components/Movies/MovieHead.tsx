import Head from "next/head";
import React from "react";

const MovieHead = ({ movieData, router }: any) => {
  return (
    <Head>
      <title>Mundo dos Filmes | {movieData.title}</title>
      <meta name="description" content="Mundo dos filmes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta
        property="og:url"
        content={`https://mundo-dos-filmes.vercel.app${router.asPath}`}
      />
      <meta property="og:type" content="article" />
      <meta
        property="og:title"
        content={`Mundo dos Filmes | ${movieData.title}`}
      />
      <meta property="og:description" content={movieData.tagline} />
      <meta
        property="og:image"
        content={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
      />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MovieHead;
