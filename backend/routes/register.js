const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Ошибка хеширования:', err);
      return res.status(500).json({ success: false, error: 'Ошибка регистрации' });
    }

    const sql = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, hashedPassword], (err) => {
      if (err) {
        console.error('Ошибка при добавлении пользователя:', err);
        return res.status(500).json({ success: false, error: 'Ошибка регистрации' });
      }

      res.status(201).json({ success: true, message: 'Пользователь зарегистрирован' });
    });
  });
});
