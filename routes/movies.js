const router = require('express').Router();
const { validateMovie, validateIdMovie } = require('../middlewares/requestValidation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateMovie, createMovie);
router.delete('/_id', validateIdMovie, deleteMovie);

module.exports = router;
