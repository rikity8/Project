const express = require('express');
const bcrypt = require('bcrypt'); // Подключаем bcrypt
const router = express.Router();
const db = require('../db');

// POST /api/login — проверка входа пользователя
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Ошибка при запросе:', err);
      return res.status(500).json({ success: false, error: 'Ошибка сервера' });
    }

    if (results.length === 0) {
      return res.json({ success: false, error: 'Неверный email или пароль' });
    }

    const user = results[0];

    // Сравниваем введённый пароль с хешированным
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.json({ success: true, user: { id: user.id, email: user.email } });
    } else {
      res.json({ success: false, error: 'Неверный email или пароль' });
    }
  });
});

// POST /api/register — для регистрации пользователя
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Хешируем пароль перед сохранением
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Ошибка хеширования:', err);
      return res.status(500).json({ success: false, error: 'Ошибка регистрации' });
    }

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Ошибка при добавлении пользователя:', err);
        return res.status(500).json({ success: false, error: 'Ошибка регистрации' });
      }

      res.json({ success: true, message: 'Регистрация прошла успешно!' });
    });
  });
});

module.exports = router;
