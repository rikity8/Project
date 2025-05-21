const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// POST /api/login — вход пользователя
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.warn('Попытка входа без email или пароля');
    return res.status(400).json({ error: 'Email и пароль обязательны' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Ошибка при выполнении SQL-запроса:', err);
      return res.status(500).json({ error: 'Ошибка сервера при доступе к базе данных' });
    }

    if (results.length === 0) {
      console.warn(`Попытка входа: пользователь с email ${email} не найден`);
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const user = results[0];

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        console.warn(`Попытка входа: неверный пароль для пользователя ${email}`);
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      console.log(`Пользователь ${email} успешно вошёл в систему`);

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        }
      });
    } catch (compareError) {
      console.error('Ошибка при проверке пароля:', compareError);
      return res.status(500).json({ error: 'Ошибка сервера при проверке пароля' });
    }
  });
});

module.exports = router;
