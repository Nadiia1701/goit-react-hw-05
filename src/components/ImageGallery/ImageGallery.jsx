import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css"

export default function ImageGallery({ items, onImageClick }) {
    return (
        <ul className={css.listContainer}>
            {items.map((item) => (
                <li key={item.id} onClick={() => onImageClick(item)}>
                    <ImageCard urls={item.urls} description={item.description} />
                </li>
            ))}
        </ul>
    );
}