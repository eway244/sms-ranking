const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware');

// 创建评分
router.post('/', authMiddleware.verifyToken, ratingController.createRating);

// 获取所有评分
router.get('/', ratingController.getAllRatings);

// 获取单个评分
router.get('/:id', ratingController.getRatingById);

// 更新评分
router.put('/:id', authMiddleware.verifyToken, ratingController.updateRating);

// 删除评分
router.delete('/:id', authMiddleware.verifyToken, ratingController.deleteRating);

module.exports = router;