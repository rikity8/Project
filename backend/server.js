const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const router = express.Router(); // Создаём маршрут
const port = 3000;

// Подключение к базе данных
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1324', 
  database: 'travel_db'
});

db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных');
  }
});

app.use(cors());
app.use(bodyParser.json()); // Обработка JSON данных

// Маршрут для регистрации
router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  console.log('Получены данные для регистрации:', { name, email, phone, password });

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'Не все данные были отправлены' });
  }

  // Запрос в базу данных
  const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, password], (err) => {
    if (err) {
      console.error('Ошибка при добавлении пользователя:', err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  });
});

// Подключаем маршруты (регистрируем наши маршруты)
app.use('/api', router); // Регистрируем маршруты через '/api'

// Стартуем сервер
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
