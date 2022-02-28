// модуль нулевой зависимости, который загружает переменные среды из .envфайла в process.env
require('dotenv').config();
// подключаем веб-фреймворк для приложений Node.js
const express = require('express');
// подключаем модуль для работы с mongodb на javascript
const mongoose = require('mongoose');
// подключаем модуль для парсинга тела запроса
const bodyParser = require('body-parser');
// подключаем модуль для валидации ошщибок в запросе
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
const { PORT, DB_ADDRESS } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/allowedCors');

const app = express();
mongoose.connect(DB_ADDRESS, () => {
  console.log('База данных подключена');
});

const { login, createUser } = require('./controllers/users');
const { validateUser } = require('./middlewares/requestValidation');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsHandler);
app.use(requestLogger);

app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.get('/signout', (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Выход' });
});

app.use('/', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
