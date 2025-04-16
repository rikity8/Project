const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { name, email, phone, password } = req.body;

  const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, password], (err) => {
    if (err) {
      console.error('Ошибка при добавлении пользователя:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  });
});

module.exports = router;
