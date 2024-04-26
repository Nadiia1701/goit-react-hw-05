import css from "./ImageCard.module.css"

export default function ImageCard({ urls, description, onClick }) {
    const handleClick = () => {
        onClick(urls.small, urls.regular);
    };

    return (
        <div>
            <img className={css.img} src={urls.small} alt={description} onClick={handleClick} />
        </div>
    );
}