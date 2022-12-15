import { useRouter } from "next/router";
import React from "react";

const Movie = () => {
  const router = useRouter();
  const { movieId } = router.query;

  React.useEffect(() => {
    console.log("Fetch " + movieId);
  }, [movieId]);

  return <div>Filme {movieId}</div>;
};

export default Movie;
