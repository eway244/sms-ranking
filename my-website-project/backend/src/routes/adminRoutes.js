const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// 获取所有用户信息
router.get('/users', authMiddleware.verifyAdmin, adminController.getAllUsers);

// 认证用户
router.post('/users/:id/verify', authMiddleware.verifyAdmin, adminController.verifyUser);

// 删除用户
router.delete('/users/:id', authMiddleware.verifyAdmin, adminController.deleteUser);

// 创建版块
router.post('/sections', authMiddleware.verifyAdmin, adminController.createSection);

// 编辑版块
router.put('/sections/:id', authMiddleware.verifyAdmin, adminController.updateSection);

// 删除版块
router.delete('/sections/:id', authMiddleware.verifyAdmin, adminController.deleteSection);

module.exports = router;