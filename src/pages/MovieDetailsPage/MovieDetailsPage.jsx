import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovieById } from "../../fetchMovies";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
// import MovieCast from "../../components/MovieCast/MovieCast";
// import MovieReviews from "../../components/MovieReviews/MovieReviews";

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movie_id } = useParams();

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

  //   const [showCast, setShowCast] = useState(false);
  //   const [showReviews, setShowReviews] = useState(false);

  //   const toggleCast = () => {
  //     setShowCast(true);
  //     setShowReviews(false);
  //   };

  //   const toggleReviews = () => {
  //     setShowCast(false);
  //     setShowReviews(true);
  //   };

  return (
    <div>
      <div>
        <Link to={backLinkURLRef.current}>Go back</Link>
      </div>
      {movie && <MovieInfo movie={movie} />}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {/* <h4>Additional information</h4> */}
      <ul>
        <li>
          <Link to={`/movies/${movie_id}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`/movies/${movie_id}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {/* {showCast && <MovieCast movieId={movieId} />}
      {showReviews && <MovieReviews movieId={movieId} />} */}
    </div>
  );
}
