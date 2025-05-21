const express = require('express');
const router = express.Router();
const db = require('../db');

// Обработка регистрации нового пользователя
router.post('/', (req, res) => {
  const { name, email, phone, password } = req.body;

  console.log('Получен запрос на регистрацию:', req.body);

  // Проверяем, переданы ли все поля
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';

  db.query(sql, [name, email, phone, password], (err, result) => {
    if (err) {
      // Обработка ошибки дубликата email
      if (err.code === 'ER_DUP_ENTRY') {
        console.warn('Попытка регистрации с уже существующим email:', email);
        return res.status(409).json({ message: 'Email уже зарегистрирован' });
      }

      console.error('Ошибка при добавлении пользователя:', err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }

    console.log('Пользователь успешно зарегистрирован:', { id: result.insertId, email });
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  });
});

module.exports = router;
