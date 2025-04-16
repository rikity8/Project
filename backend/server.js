const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const loginRoute = require('./routes/login'); // Импортируем маршрут входа и регистрации

const app = express();
const port = 3000;

// Подключение к базе данных
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // Пустой пароль, если у тебя так
  database: 'travel_db'
});

db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных');
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключаем маршруты для входа и регистрации
app.use('/api', loginRoute);  // Теперь все запросы через /api/login и /api/register

// Стартуем сервер
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
