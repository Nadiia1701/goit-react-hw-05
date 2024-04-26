import toast, { Toaster } from "react-hot-toast"
import css from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const query = form.elements.query.value;
        if (query.trim() === "") {
            toast.error("Please enter search term!");
            return;
        }
        onSearch(query);
        form.reset();
    }

    return (
        <header className={css.header}>
            <form onSubmit={handleSubmit}>
                <input className={css.input}
                    name="query"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.btn} type="submit">Search</button>
                <Toaster />
            </form>
        </header>
    );
}