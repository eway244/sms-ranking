const express = require('express');
const authController = require('../controllers/authController');
const { validateRegister, validateLogin, validateForgotPassword } = require('../middlewares/authMiddleware');

const router = express.Router();

// 用户注册
router.post('/register', validateRegister, authController.register);

// 用户登录
router.post('/login', validateLogin, authController.login);

// 忘记密码
router.post('/forgot-password', validateForgotPassword, authController.forgotPassword);

module.exports = router;