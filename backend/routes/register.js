const express = require('express');
const bcrypt = require('bcrypt'); 
const router = express.Router();
const db = require('../db');

// Обработка регистрации нового пользователя
router.post('/', async (req, res) => {
  const { name, email, phone, password } = req.body;

  console.log('Получен запрос на регистрацию:', req.body);

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  try {
    // Хэшируем пароль перед вставкой в БД
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, hashedPassword], (err, result) => {
      if (err) {
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
  } catch (error) {
    console.error('Ошибка при хэшировании пароля:', error);
    res.status(500).json({ message: 'Ошибка сервера при обработке пароля' });
  }
});

module.exports = router;
