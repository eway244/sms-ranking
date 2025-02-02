const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
    };
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
};