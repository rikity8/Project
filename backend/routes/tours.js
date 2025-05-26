const express = require('express');
const db = require('../db');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Получение данных о туре
router.get('/:id', async (req, res) => {
  try {
    console.log('Тур роутер загружен');

    const tourId = req.params.id;
    console.log('Запрос тура с id:', tourId);

    // Получаем основную информацию о туре
    const [tour] = await db.promise().query('SELECT * FROM tours WHERE id = ?', [tourId]);
    console.log('Данные тура из базы:', tour);

    if (!tour || !tour.length) {
      console.warn(`Тур с id ${tourId} не найден`);
      return res.status(404).json({ error: 'Тур не найден' });
    }

    // Получаем программу тура
    const [itinerary] = await db.promise().query(
      'SELECT * FROM tour_itinerary WHERE tour_id = ? ORDER BY day',
      [tourId]
    );
    console.log('Программа тура:', itinerary);

    // Получаем список фото из папки
    const tourImagesDir = path.join(__dirname, '../public/images/tours', tourId);
    let gallery = [];

    if (fs.existsSync(tourImagesDir)) {
      gallery = fs.readdirSync(tourImagesDir)
        .filter(file => ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase()))
        .map(file => `/images/tours/${tourId}/${file}`);
    } else {
      console.warn(`Папка с изображениями для тура ${tourId} не найдена по пути ${tourImagesDir}`);
    }
    console.log('Галерея:', gallery);

    // Обработка описания с защитой от ошибки парсинга
    let description;
    try {
      description = JSON.parse(tour[0].description);
      if (!Array.isArray(description)) {
        // Если описание должно быть массивом, проверяем
        console.warn('Описание тура не является массивом, отправляем как строку');
        description = [String(description)];
      }
    } catch (parseErr) {
      console.warn('Не удалось распарсить описание JSON, отправляем как текст:', parseErr);
      // Если описание не JSON, отправляем как есть, оборачивая в массив, если нужно
      if (typeof tour[0].description === 'string') {
        description = [tour[0].description];
      } else {
        description = [];
      }
    }

    // Формируем и отправляем ответ
    res.json({
      id: tour[0].id,
      title: tour[0].title || 'Без названия',
      mainImage: `/images/tours/${tourId}/main.jpg`,
      description,
      itinerary: Array.isArray(itinerary) ? itinerary : [],
      gallery,
      price: tour[0].price || 'Цена не указана',
      duration: tour[0].duration || 'Длительность не указана'
    });

  } catch (err) {
    console.error('Ошибка при получении тура:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
