document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // отменяем стандартную отправку формы
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Простейшая валидация
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
  
    if (!/^\+?\d{10,15}$/.test(phone)) {
      alert('Введите корректный номер телефона');
      return;
    }
  
    // Здесь можно отправить данные на сервер через fetch
    const userData = {
      name,
      email,
      phone,
      password
    };
  
    console.log('Отправляем данные:', userData);
    alert('Регистрация прошла успешно!');
    
    // Очистка формы (по желанию)
    this.reset();
  });
  