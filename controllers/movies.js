const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');

// получение всех фильмов
module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

//  создание фильма
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie
    .create({ owner, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else { next(err); }
    });
};

// удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  Movie
    .findById(req.params.id)
    .orFail(new NotFoundError('Фильм не найдена'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie.remove()
          .then((removeMovie) => res.send(removeMovie));
      } else {
        throw new ForbiddenError('Попытка удалить чужой фильм');
      }
    })
    .catch(next);
};
