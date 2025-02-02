// backend/src/controllers/postController.js

const Post = require('../models/Post');
const Comment = require('../models/Comment');

// 创建新帖子
exports.createPost = async (req, res) => {
    try {
        const { title, content, images, category } = req.body;
        const newPost = new Post({
            title,
            content,
            images,
            category,
            author: req.user.id,
        });
        await newPost.save();
        res.status(201).json({ message: '帖子创建成功', post: newPost });
    } catch (error) {
        res.status(500).json({ message: '创建帖子失败', error: error.message });
    }
};

// 获取所有帖子
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: '获取帖子失败', error: error.message });
    }
};

// 获取单个帖子
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username').populate('comments');
        if (!post) {
            return res.status(404).json({ message: '帖子未找到' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: '获取帖子失败', error: error.message });
    }
};

// 编辑帖子
exports.updatePost = async (req, res) => {
    try {
        const { title, content, images } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content, images }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: '帖子未找到' });
        }
        res.status(200).json({ message: '帖子更新成功', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: '更新帖子失败', error: error.message });
    }
};

// 删除帖子
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: '帖子未找到' });
        }
        res.status(200).json({ message: '帖子删除成功' });
    } catch (error) {
        res.status(500).json({ message: '删除帖子失败', error: error.message });
    }
};