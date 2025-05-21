import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "./assets/tour-bg.jpg";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Отправка...");
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Регистрация успешна!");
        setFormData({ name: "", email: "", phone: "", password: "" });
      } else {
        const error = await res.json();
        setMessage(error.message || "Ошибка регистрации.");
      }
    } catch (err) {
      setMessage("Сервер недоступен.");
    }
  };

  return (
    <div className="fullscreen-page">
      <div 
        className="background-image" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      <motion.div 
        className="registration-form"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Регистрация в <span>Travel World</span></h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Зарегистрироваться
          </motion.button>
        </form>
        
        {message && <div className="message">{message}</div>}
        
        <div className="login-link">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
        </div>
      </motion.div>
    </div>
  );
}