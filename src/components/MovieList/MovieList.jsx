import css from "./MovieList.module.css";
import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.container}>
      {movies.map((movie) => (
        <li key={nanoid()} className={css.movieWrapper}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
