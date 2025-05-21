import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUser, FiMail, FiPhone, FiEdit, FiBriefcase,
  FiHeart, FiLogOut, FiHome, FiGithub
} from "react-icons/fi";
import "./Account.css";
import backgroundImage from "./assets/travel-bg.jpg";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("userData");

    if (!stored) {
      console.warn("Нет userData в sessionStorage");
      navigate("/login");
      return;
    }

    const userData = JSON.parse(stored);
    setUser(userData);

    // Если нужно загрузить более свежие данные с сервера по id:
    
    fetch(`http://localhost:3000/api/account/${userData.id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Ошибка загрузки данных:", err));
    
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    navigate("/login");
    alert("Вы успешно вышли из системы");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!user) return null; // Пока нет данных — ничего не показываем

  return (
    <div className="account-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="account-overlay"></div>

      <button className="floating-home-btn" onClick={handleGoHome}>
        <FiHome />
      </button>

      <div className="account-container">
        <div className="profile-header">
          <div className="avatar"><FiUser size={24} /></div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="member-since">Участник с {user.memberSince || "не указано"}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Личная информация</h3>
          <div className="info-item"><FiMail className="info-icon" /> <span>{user.email}</span></div>
          <div className="info-item"><FiPhone className="info-icon" /> <span>{user.phone}</span></div>
        </div>

        <div className="profile-section">
          <h3>Предстоящие поездки</h3>
          {(user.upcomingTrips || []).map(trip => (
            <div key={trip.id} className="trip-item">
              <div className="trip-destination">{trip.destination}</div>
              <div className="trip-date">{trip.date}</div>
            </div>
          ))}
        </div>

        <div className="actions-section">
          <Link to="/edit-profile" className="action-btn"><FiEdit /> Редактировать</Link>
          <Link to="/trips" className="action-btn"><FiBriefcase /> Мои поездки</Link>
          <Link to="/favorites" className="action-btn"><FiHeart /> Избранное</Link>
          <button onClick={handleLogout} className="action-btn logout"><FiLogOut /> Выйти</button>
        </div>
      </div>

      <footer className="footer">
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
          <FiGithub /> github.com/your-username
        </a>
      </footer>
    </div>
  );
}
