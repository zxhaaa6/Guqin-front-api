import { getRedisDb } from '../system/RedisManager';

class SessionStore {
  constructor() {
    this.redis = getRedisDb();
  }
  async get(key) {
    const data = await this.redis.get(`SESSION:${key}`);
    return JSON.parse(data);
  }
  async set(key, session, maxAge) {
    await this.redis.set(
      `SESSION:${key}`,
      JSON.stringify(session),
      'EX',
      maxAge / 1000,
    );
    return key;
  }
  async destroy(key) {
    const result = await this.redis.del(`SESSION:${key}`);
    return result;
  }
}

export default SessionStore;
