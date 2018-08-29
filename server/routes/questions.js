const router = require('express').Router();
const auth     = require('../middleware/auth');
const isLogin = require('../middleware/isLogin');
const authUser  = auth(['user', 'admin'])
const authAdmin = auth(['admin'])

const {getQuestions, getQuestion, newQuestion, updateQuestion, deleteQuestion} = require('../controllers/question');

router.get('/questions', isLogin, getQuestions)
router.post('/questions', isLogin, authUser, newQuestion)
router.get('/questions/:id', isLogin, authUser, getQuestion)
router.put('/questions/:id', isLogin, authUser, updateQuestion)
router.delete('/questions/:id', isLogin, authUser, deleteQuestion)

module.exports = router;