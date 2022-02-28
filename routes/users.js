const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/requestValidation');
const { getCurrentUser, updateUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUserUpdate, updateUser);

module.exports = router;
