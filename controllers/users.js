const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthorizationError = require('../errors/authorization-error');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { JWT_SECRET } = require('../config');

// получить данные пользователя
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ name: user.name, email: user.email });
      }
      throw new NotFoundError('Пользователь не найден');
    })
    .catch(next);
};

// создать нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  console.log(req.body);
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Данный почтовый ящик уже используется'));
      } else {
        next(err);
      }
    });
};

// изменение данных пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неправильная почта или пароль'));
      } if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else { next(err); }
    });
};

// Контроллер -login, который получает из запроса почту и пароль и проверяет их
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7, // срок жизни куки 7 дней
          httpOnly: true,
          sameSite: false,
        })
        .send({ data: user.toJSON() });
    })
    .catch(() => next(new AuthorizationError('Ошибка авторизации')));
};
