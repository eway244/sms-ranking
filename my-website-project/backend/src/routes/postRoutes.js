const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 获取所有帖子
router.get('/', postController.getAllPosts);

// 创建新帖子
router.post('/', authMiddleware.verifyToken, postController.createPost);

// 获取单个帖子
router.get('/:id', postController.getPostById);

// 更新帖子
router.put('/:id', authMiddleware.verifyToken, postController.updatePost);

// 删除帖子
router.delete('/:id', authMiddleware.verifyToken, postController.deletePost);

// 获取帖子评论
router.get('/:id/comments', postController.getPostComments);

// 添加评论
router.post('/:id/comments', authMiddleware.verifyToken, postController.addComment);

module.exports = router;