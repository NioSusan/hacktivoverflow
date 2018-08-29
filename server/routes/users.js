const router = require('express').Router();
const {googleLogin, login, register} = require('../controllers/user');

router.post('/googleLogin', googleLogin);
router.post('/login', login);
router.post('/register', register);

module.exports = router;
