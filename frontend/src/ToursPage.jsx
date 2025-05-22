import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ToursPage.css";

import tour1 from "./assets/tour1.jpg";
import tour2 from "./assets/tour2.jpg";
import tour3 from "./assets/tour3.jpg";
import tour4 from "./assets/tour4.jpg";
import tour5 from "./assets/tour5.jpg";
import tour6 from "./assets/tour6.jpg";

export default function ToursPage() {
  const [favorites, setFavorites] = useState([]);
  const userId = 1; // Временно

  const tours = [
    { id: 1, title: "Романтическая Италия", description: "10 дней по самым красивым городам Италии.", price: "₸ 350 000", image: tour1 },
    { id: 2, title: "Альпийская Швейцария", description: "8 дней в швейцарских Альпах.", price: "₸ 400 000", image: tour2 },
    { id: 3, title: "Тропический Таиланд", description: "12 дней на лучших пляжах Таиланда.", price: "₸ 320 000", image: tour3 },
    { id: 4, title: "Испанская Сиеста", description: "Отдых в Барселоне, Валенсии и Мадриде.", price: "₸ 300 000", image: tour4 },
    { id: 5, title: "Французский шик", description: "Париж, Лазурный берег и винные туры.", price: "₸ 370 000", image: tour5 },
    { id: 6, title: "Норвежские фьорды", description: "Экспедиция по северной Норвегии.", price: "₸ 450 000", image: tour6 }
  ];

  useEffect(() => {
    fetch(`http://localhost:3000/api/favorites/${userId}`)
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(err => console.error("Ошибка загрузки избранного:", err));
  }, []);

  const isFavorite = (id) => favorites.some(item => item.tour_id === id);

  const handleFavoriteToggle = (tour) => {
    if (isFavorite(tour.id)) {
      fetch(`http://localhost:3000/api/favorites/${userId}/${tour.id}`, {
        method: "DELETE"
      }).then(() => {
        setFavorites(favorites.filter(fav => fav.tour_id !== tour.id));
      });
    } else {
      fetch("http://localhost:3000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          tour_id: tour.id,
          title: tour.title,
          description: tour.description,
          price: tour.price,
          image: tour.image
        })
      }).then(res => res.json())
        .then(() => setFavorites([...favorites, { tour_id: tour.id, ...tour }]));
    }
  };

  return (
    <div className="tours-page">
      <h1>Доступные туры</h1>
      <div className="tour-list">
        {tours.map(tour => (
          <div key={tour.id} className="tour-item">
            <div className="tour-image" style={{ backgroundImage: `url(${tour.image})` }} />
            <div className="tour-details">
              <h2>{tour.title}</h2>
              <p>{tour.description}</p>
              <div className="price">{tour.price}</div>
              <div className="tour-actions">
                <Link to={`/tour/${tour.id}`} className="details-button">Подробнее</Link>
                <button
                  className="add-favorite-btn"
                  onClick={() => handleFavoriteToggle(tour)}
                >
                  {isFavorite(tour.id) ? <FaHeart /> : <FaRegHeart />}
                  {isFavorite(tour.id) ? "Удалить" : "В избранное"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
