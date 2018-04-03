const RedisManager = require('../system/RedisManager');

class SessionStore {
    constructor() {
        this.redis = RedisManager.getRedisDb();
    }
    async get(key) {
        let data = await this.redis.get(`SESSION:${key}`);
        return JSON.parse(data);
    }
    async set(key, session, maxAge) {
        await this.redis.set(`SESSION:${key}`, JSON.stringify(session), 'EX', maxAge / 1000);
        return key;
    }
    async destroy(key) {
        return await this.redis.del(`SESSION:${key}`);
    }
}

module.exports = SessionStore;