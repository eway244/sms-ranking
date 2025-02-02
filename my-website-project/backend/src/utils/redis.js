const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

client.on('error', (err) => {
    console.error('Redis error: ', err);
});

const setCache = (key, value, expiration = 3600) => {
    client.setex(key, expiration, JSON.stringify(value));
};

const getCache = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data ? JSON.parse(data) : null);
        });
    });
};

const deleteCache = (key) => {
    client.del(key);
};

module.exports = {
    setCache,
    getCache,
    deleteCache,
};