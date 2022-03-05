const router = require('express').Router();
const { validateMovie, validateIdMovie } = require('../middlewares/requestValidation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:id', validateIdMovie, deleteMovie);

module.exports = router;
