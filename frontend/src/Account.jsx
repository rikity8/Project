import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit, FiBriefcase, FiHeart, FiLogOut, FiHome } from "react-icons/fi";
import "./App.css";
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
    // Здесь должна быть логика выхода (очистка токена и т.д.)
    console.log("Пользователь вышел из системы");
    navigate("/login"); // Перенаправляем на страницу входа
  };

  return (
    <div className="account-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="account-overlay"></div>
      
      <div className="account-container">
        {/* Заголовок профиля */}
        <div className="profile-header">
          <div className="avatar">
            <FiUser size={24} />
          </div>
          <div>
            <h2>{user.name}</h2>
            <p className="member-since">Участник с {user.memberSince}</p>
          </div>
        </div>

        {/* Основная информация */}
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

        {/* Предстоящие поездки */}
        <div className="profile-section">
          <h3>Предстоящие поездки</h3>
          {user.upcomingTrips.map(trip => (
            <div key={trip.id} className="trip-item">
              <div className="trip-destination">{trip.destination}</div>
              <div className="trip-date">{trip.date}</div>
            </div>
          ))}
        </div>

        {/* Любимые направления */}
        <div className="profile-section">
          <h3>Предпочтения</h3>
          <div className="preferences">
            {user.favoriteDestinations.map((dest, index) => (
              <div key={index} className="preference-tag">{dest}</div>
            ))}
          </div>
        </div>

        {/* Действия */}
        <div className="actions-section">
          <Link to="/edit-profile" className="action-btn">
            <FiEdit /> Редактировать
          </Link>
          <Link to="/trips" className="action-btn">
            <FiBriefcase /> Мои поездки
          </Link>
          <Link to="/wishlist" className="action-btn">
            <FiHeart /> Список желаний
          </Link>
          <button onClick={handleLogout} className="action-btn logout">
            <FiLogOut /> Выйти
          </button>
        </div>

        <Link to="/" className="back-home">
          <FiHome /> На главную
        </Link>
      </div>
    </div>
  );
}