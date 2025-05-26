import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import "./App.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const userId = 1; // заменить на авторизованного пользователя

  // Загружаем избранные туры
  useEffect(() => {
    fetch(`http://localhost:3000/api/favorites/${userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setFavorites(data))
      .catch(err => console.error("Ошибка загрузки избранного:", err));
  }, []);
  

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Избранные туры</h1>
        <p>Ваши сохраненные путешествия</p>
      </div>

      <div className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map(tour => (
            <div key={tour.tour_id} className="favorite-card">
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
                    onClick={() => removeFromFavorites(tour.tour_id)}
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
