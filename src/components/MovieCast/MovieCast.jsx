import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { fetchMovieCastById } from "../../fetchMovies";

export default function MovieCast() {
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovieCastById(movieId);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <div>
      {cast &&
        cast.map((actor, index) => (
          <li key={`${actor.id}-${index}`}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "defaultImg"
              }
              alt={actor.name}
            />
            <div>
              <p>{actor.name}</p>
              <p>
                Character: <span>{actor.character}</span>
              </p>
            </div>
          </li>
        ))}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
    </div>
  );
}
