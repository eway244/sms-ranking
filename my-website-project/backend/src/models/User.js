const mongoose = require('mongoose');
const bcrypt = require('../utils/bcrypt');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  realName: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hashPassword(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.comparePassword(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;