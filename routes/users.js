const router = require('express').Router();
const { validateUserUpdate, validationIdUser } = require('../middlewares/requestValidation');
const { getCurrentUser, updateUser } = require('../controllers/users');

router.get('/me', validationIdUser, getCurrentUser);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
