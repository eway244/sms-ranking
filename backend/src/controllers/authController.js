const User = require('../models/User');
const bcrypt = require('../utils/bcrypt');
const jwt = require('../utils/jwt');

// 用户注册
exports.register = async (req, res) => {
    const { username, phone, password, realName, className } = req.body;

    // 数据校验
    if (!username || !phone || !password) {
        return res.status(400).json({ message: '必填项不能为空' });
    }

    try {
        const hashedPassword = await bcrypt.hashPassword(password);
        const newUser = new User({
            username,
            phone,
            password: hashedPassword,
            realName,
            className,
            isVerified: false,
        });

        await newUser.save();
        res.status(201).json({ message: '注册成功' });
    } catch (error) {
        res.status(500).json({ message: '注册失败', error });
    }
};

// 用户登录
exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ message: '手机号或账户名和密码不能为空' });
    }

    try {
        const user = await User.findOne({ $or: [{ username: identifier }, { phone: identifier }] });
        if (!user || !(await bcrypt.comparePassword(password, user.password))) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }

        const token = jwt.generateToken(user._id);
        res.status(200).json({ token, user: { username: user.username, phone: user.phone, isVerified: user.isVerified } });
    } catch (error) {
        res.status(500).json({ message: '登录失败', error });
    }
};

// 忘记密码
exports.forgotPassword = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ message: '手机号不能为空' });
    }

    // 发送验证码逻辑（略）
    res.status(200).json({ message: '验证码已发送' });
};

// 重置密码
exports.resetPassword = async (req, res) => {
    const { phone, newPassword } = req.body;

    if (!phone || !newPassword) {
        return res.status(400).json({ message: '手机号和新密码不能为空' });
    }

    try {
        const hashedPassword = await bcrypt.hashPassword(newPassword);
        await User.updateOne({ phone }, { password: hashedPassword });
        res.status(200).json({ message: '密码重置成功' });
    } catch (error) {
        res.status(500).json({ message: '密码重置失败', error });
    }
};