import { Link } from "react-router-dom";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import { useFavorites } from "./FavoritesContext";
import "./App.css";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Избранные туры</h1>
        <p>Ваши сохраненные путешествия</p>
      </div>

      <div className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map(tour => (
            <div key={tour.id} className="favorite-card">
              <div
                className="favorite-card-image"
                style={{ backgroundImage: `url(${tour.image})` }}
              >
                <div className="favorite-card-overlay">
                  <span>{tour.duration || "—"}</span>
                </div>
              </div>
              <div className="favorite-card-content">
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <div className="favorite-card-meta">
                  <span className="favorite-card-price">{tour.price}</span>
                  <button
                    className="remove-favorite"
                    onClick={() => removeFromFavorites(tour.id)}
                  >
                    <FaHeart /> Удалить
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-favorites">
            <p>У вас пока нет избранных туров</p>
            <Link to="/tours" className="explore-link">
              Посмотреть туры <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
