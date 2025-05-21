import { motion } from "framer-motion";
import mainImage from "./assets/mountain-bg.jpg";
import tour1 from "./assets/tour1.jpg"; // Италия
import tour2 from "./assets/tour2.jpg"; // Швейцария
import tour3 from "./assets/tour3.jpg"; // Таиланд
import { Link } from "react-router-dom";
import "./App.css";

export default function HomePage() {
  const tours = [
    {
      id: 4,
      title: "Романтическая Италия",
      description: "10 дней по самым красивым городам Италии",
      price: "₸ 350 000",
      image: tour1,
      fullDescription: "Тур включает посещение Рима, Венеции, Флоренции..."
    },
    {
      id: 5,
      title: "Альпийская Швейцария",
      description: "8 дней в швейцарских Альпах",
      price: "₸ 400 000",
      image: tour2,
      fullDescription: "Экскурсии по Церматту, Интерлакену, Люцерну..."
    },
    {
      id: 6,
      title: "Тропический Таиланд",
      description: "12 дней на лучших пляжах Таиланда",
      price: "₸ 320 000",
      image: tour3,
      fullDescription: "Отдых на Пхукете, экскурсии по Бангкоку..."
    }
  ];

  return (
    <div className="home-page">
      {/* Шапка */}
      <nav className="main-nav minimal">
        <div className="nav-links">
            <Link to="/tours">Туры</Link>
            <Link to="/favorites">Избранное</Link> {/* Новая ссылка */}
            <Link to="/contacts">Контакты</Link>
            <Link to="/account">Аккаунт</Link>
        </div>
      </nav> 
      

      {/* Главный баннер в стиле Dolomites */}
      <header className="hero-banner full-banner" style={{ backgroundImage: `url(${mainImage})` }}>
        <div className="overlay" />
        <div className="circle-gradient" />
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>D O L O M I T E S</h1>
          <h2>ITALY</h2>
          <button className="discover-button">Открыть направление</button>
        </motion.div>
      </header>

      {/* Туры — по одному в колонке */}
      <section className="vertical-tours">
        {tours.map(tour => (
          <div key={tour.id} className="vertical-tour-card">
            <div className="image" style={{ backgroundImage: `url(${tour.image})` }} />
            <div className="info">
              <h3>{tour.title}</h3>
              <p>{tour.description}</p>
              <div className="price">{tour.price}</div>
              <Link to={`/tour/${tour.id}`} className="tour-button">Подробнее</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
