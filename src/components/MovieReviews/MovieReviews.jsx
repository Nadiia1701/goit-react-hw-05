import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { fetchMovieRevievsById } from "../../fetchMovies";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const [reviews, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovieRevievsById(movieId);
        setReview(data);
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
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul>
        {reviews.map((review) => (
          <li key={nanoid()}>
            <p>
              Author: <span>{review.author}</span>
            </p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
