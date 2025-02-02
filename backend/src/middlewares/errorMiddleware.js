module.exports = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || '内部服务器错误';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};