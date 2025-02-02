// ratingController.js

const Rating = require('../models/Rating');

// 创建评分
exports.createRating = async (req, res) => {
    try {
        const { postId, score, comment } = req.body;
        const newRating = new Rating({
            postId,
            userId: req.user.id,
            score,
            comment
        });
        await newRating.save();
        res.status(201).json({ message: '评分成功', rating: newRating });
    } catch (error) {
        res.status(500).json({ message: '评分失败', error: error.message });
    }
};

// 获取帖子评分
exports.getRatingsByPostId = async (req, res) => {
    try {
        const ratings = await Rating.find({ postId: req.params.postId });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: '获取评分失败', error: error.message });
    }
};

// 获取用户评分
exports.getUserRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ userId: req.user.id });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: '获取用户评分失败', error: error.message });
    }
};