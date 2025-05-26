// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Создаем подключение и экспортируем
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

// Передаем подключение в роутеры
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  next();
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());

// Роуты
app.use('/api/login', require('./routes/login'));
app.use('/api/register', require('./routes/register'));
app.use('/api/account', require('./routes/account'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/tours', require('./routes/tours'));

// Запуск
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
