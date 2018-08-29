const router = require('express').Router();
const auth     = require('../middleware/auth');
const isLogin = require('../middleware/isLogin');
const authUser  = auth(['user', 'admin'])
const authAdmin = auth(['admin'])

const {getAnswers, getAnswer, newAnswer, updateAnswer} = require('../controllers/answer');

router.get('/answers',isLogin, getAnswers)
router.post('/answers', isLogin, authUser, newAnswer)
router.get('/answers/:id', isLogin, authUser, getAnswer)
router.put('/answers/:id', isLogin, authUser, updateAnswer)

module.exports = router;
