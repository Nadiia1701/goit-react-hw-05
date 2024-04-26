import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import { fetchTrendingMovies } from "../../fetchMovies.js";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getMovies() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchTrendingMovies(page);
        setMovies((prevMovies) => {
          return [...prevMovies, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <main>
      <h1>Trending today</h1>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {movies.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </main>
  );
}
