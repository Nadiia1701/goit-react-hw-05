import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { useState } from "react";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter search term!");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={query}
        className={css.input}
        placeholder="Search movies"
        name="search"
        required
        autoFocus
      />
      <button className={css.btn} type="submit">
        Search
      </button>
      <Toaster />
    </form>
  );
}
