import { Link } from "react-router-dom";
import { FaHeart, FaArrowRight } from "react-icons/fa";
import "./App.css";

export default function FavoritesPage() {
  // Пример данных - замените на реальные из состояния/хранилища
  const favorites = [
    {
      id: 1,
      title: "Горные вершины Аатая",
      description: "7-дневный тур по самым живописным местам",
      price: "₸ 250 000",
      image: "url-to-image-1",
      duration: "7 дней"
    },
    {
      id: 2,
      title: "Романтическая Италия", 
      description: "10 дней по самым красивым городам Италии",
      price: "₸ 350 000",
      image: "url-to-image-2",
      duration: "10 дней"
    }
  ];

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
                  <span>{tour.duration}</span>
                </div>
              </div>
              <div className="favorite-card-content">
                <h3>{tour.title}</h3>
                <p>{tour.description}</p>
                <div className="favorite-card-meta">
                  <span className="favorite-card-price">{tour.price}</span>
                  <button className="remove-favorite">
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