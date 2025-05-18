// Подключаем бд
const mysql = require('mysql2');

// Создаём подключение к бд
const db = mysql.createConnection({
  host: 'localhost',    
  user: 'root',         
  password: '1324',      
  database: 'travel_db'  
});

// Пытаемся подключиться к бд
db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к MySQL:', err);
  } else {
    // Если подключение успешно  выводим сообщение
    console.log('Подключено к базе данных');
  }
});

module.exports = db;
