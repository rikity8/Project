const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register'); 

const app = express();
const port = 3000;

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

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());

// Роуты
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute); 

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
