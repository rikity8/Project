const express = require('express');
const db = require('../db');

const router = express.Router();

// Получить избранное по userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM favorites WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Ошибка при получении избранного:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(results);
  });
});

// Добавить в избранное
router.post('/', (req, res) => {
  const { userId, tourId, title, description, price, image } = req.body;
  const query = `
    INSERT INTO favorites (user_id, tour_id, title, description, price, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [userId, tourId, title, description, price, image], (err) => {
    if (err) {
      console.error('Ошибка при добавлении в избранное:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.status(201).json({ message: 'Добавлено в избранное' });
  });
});

// Удалить из избранного
router.delete('/:userId/:tourId', (req, res) => {
  const { userId, tourId } = req.params;
  const query = 'DELETE FROM favorites WHERE user_id = ? AND tour_id = ?';
  db.query(query, [userId, tourId], (err) => {
    if (err) {
      console.error('Ошибка при удалении из избранного:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json({ message: 'Удалено из избранного' });
  });
});

module.exports = router;
