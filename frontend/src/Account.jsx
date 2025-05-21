import { Link, useNavigate } from "react-router-dom";
import {
  FiUser, FiMail, FiPhone, FiEdit, FiBriefcase,
  FiHeart, FiLogOut, FiHome, FiGithub
} from "react-icons/fi";
import "./Account.css";
import backgroundImage from "./assets/travel-bg.jpg";

export default function Account() {
  const navigate = useNavigate();

  const user = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 777 123 4567",
    memberSince: "10 апреля 2023",
    upcomingTrips: [
      { id: 1, destination: "Рим, Италия", date: "15 мая 2023" },
      { id: 2, destination: "Бали, Индонезия", date: "10 июля 2023" }
    ],
    favoriteDestinations: ["Италия", "Тайланд", "Швейцария"]
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    navigate("/login");
    alert("Вы успешно вышли из системы");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="account-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="account-overlay"></div>

      {/* Фиксированная кнопка в левом верхнем углу */}
      <button
        className="floating-home-btn"
        onClick={handleGoHome}
        aria-label="На главную"
      >
        <FiHome />
      </button>

      <div className="account-container">
        <div className="profile-header">
          <div className="avatar">
            <FiUser size={24} />
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="member-since">Участник с {user.memberSince}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Личная информация</h3>
          <div className="info-item">
            <FiMail className="info-icon" />
            <span>{user.email}</span>
          </div>
          <div className="info-item">
            <FiPhone className="info-icon" />
            <span>{user.phone}</span>
          </div>
        </div>

        <div className="profile-section">
          <h3>Предстоящие поездки</h3>
          {user.upcomingTrips.map(trip => (
            <div key={trip.id} className="trip-item">
              <div className="trip-destination">{trip.destination}</div>
              <div className="trip-date">{trip.date}</div>
            </div>
          ))}
        </div>

        <div className="actions-section">
          <Link to="/edit-profile" className="action-btn">
            <FiEdit /> Редактировать
          </Link>
          <Link to="/trips" className="action-btn">
            <FiBriefcase /> Мои поездки
          </Link>
          <Link to="/favorites" className="action-btn">
            <FiHeart /> Избранное
          </Link>

          <button
            onClick={handleLogout}
            className="action-btn logout"
            aria-label="Выйти из аккаунта"
          >
            <FiLogOut /> Выйти
          </button>
        </div>
      </div>

      {/* Футер */}
      <footer className="footer">
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
          <FiGithub /> github.com/your-username
        </a>
      </footer>
    </div>
  );
}
