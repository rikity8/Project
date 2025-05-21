import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "./assets/login-bg.jpg";
import "./Login.css";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Проверка...");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      

      if (data.success) {
        setMessage("Успешный вход! Перенаправление...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.error || "Ошибка входа");
      }
    } catch (err) {
      setMessage("Сервер недоступен");
    }
  };

  return (
    <div className="fullscreen-page">
      <div 
        className="background-image" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      <motion.div 
        className="auth-form"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Вход в <span>Travel World</span></h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              name="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="auth-button"
          >
            Войти
          </motion.button>
        </form>

        {message && <div className="message">{message}</div>}
        
        <div className="auth-link">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>

        <div className="auth-link" style={{ marginTop: "20px" }}>
          <Link to="/" className="back-link">На главную</Link>
        </div>
      </motion.div>
    </div>
  );
}
