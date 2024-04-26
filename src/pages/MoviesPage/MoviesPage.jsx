import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import { fetchMoviesList } from "../../fetchMovies.js";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleSearch = (newQuery) => {
    setSearchParams({ query: newQuery });
    setPage(1);
    setMovies([]);
  };

  const visibleMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, movies]);

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getMovies() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMoviesList(query, page);
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
  }, [page, query]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <main>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={visibleMovies} />}
      {movies.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </main>
  );
}
