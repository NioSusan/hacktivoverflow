const router = require('express').Router();
const auth     = require('../middleware/auth');
const isLogin = require('../middleware/isLogin');
const authUser  = auth(['user', 'admin'])
const authAdmin = auth(['admin'])

const {getAnswers, getAnswer, newAnswer, updateAnswer} = require('../controllers/answer');

router.get('/answers', getAnswers)
router.post('/answers', newAnswer)
router.get('/answers/:id', getAnswer)
router.put('/answers/:id', updateAnswer)

module.exports = router;
