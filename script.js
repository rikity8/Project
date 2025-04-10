// Обработчик для формы регистрации
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // отменяем стандартную отправку формы

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    if (!/^\+?\d{10,15}$/.test(phone)) {
      alert('Введите корректный номер телефона');
      return;
    }

    // Отправляем данные на сервер
    const userData = {
      name,
      email,
      phone,
      password
    };

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      if (data.success) {
        alert('Регистрация прошла успешно!');
        // Перенаправляем на страницу входа
        // window.location.href = 'login.html'; // раскомментировать для реального перенаправления
      } else {
        alert('Ошибка регистрации');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при регистрации');
    }

    // Очистка формы (по желанию)
    this.reset();
  });
}

// Обработчик для формы входа
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        alert('Вход выполнен!');
        // Перенаправляем на страницу профиля
        // window.location.href = 'profile.html'; // раскомментировать для реального перенаправления
      } else {
        alert('Неверный email или пароль');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при входе');
    }
  });
}
