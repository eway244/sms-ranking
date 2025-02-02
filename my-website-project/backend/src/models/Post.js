const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    validate: {
      validator: function(v) {
        return v.length <= 9; // 限制最多 9 张图片
      },
      message: '最多只能上传 9 张图片！'
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['normal', 'question'],
    default: 'normal',
  },
  bestAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
});

postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;