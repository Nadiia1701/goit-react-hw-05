import { Link, useLocation } from "react-router-dom";
import css from "./MovieInfo.module.css";

export default function MovieInfo({
  movie: { id, poster_path, title, vote_average, overview, genres },
}) {
  const location = useLocation();
  const baseImagePath = "https://image.tmdb.org/t/p/w500/";
  const fileName = poster_path;
  const posterURL = baseImagePath + fileName;

  return (
    <div className={css.wrapper}>
      <img src={posterURL} alt="" />
      <p>{title}</p>
      <p>
        <b>User Score:</b> {vote_average}
      </p>
      <p>
        <b>Overview:</b> {overview}
      </p>
      <div>
        <b>Genres:</b>{" "}
        {genres && genres.length > 0 ? (
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <Link to={`/movies/${id}`} state={location}>
        Additional information
      </Link>
    </div>
  );
}
