const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/account/:id — получить данные по id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT id, name, email, phone FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Ошибка получения данных:", err);
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const user = results[0];

    // Можно дополнительно подгрузить поездки или избранное — позже
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      memberSince: "10 апреля 2023", // ← пока статично
      upcomingTrips: [],
      favoriteDestinations: []
    });
  });
});

module.exports = router;
