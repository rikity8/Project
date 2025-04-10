const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const registerRoute = require('./routes/register');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/register', registerRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
