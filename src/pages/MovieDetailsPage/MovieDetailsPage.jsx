import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovieById } from "../../fetchMovies";
import MovieInfo from "../../components/MovieInfo/MovieInfo";

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movie_id } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovieById(movie_id);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movie_id]);

  return (
    <div>
      <div>
        <Link to={backLinkURLRef.current}>Go back</Link>
      </div>

      {movie && <MovieInfo movie={movie} />}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}

      <Suspense fallback={<b>Loading nested route...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
