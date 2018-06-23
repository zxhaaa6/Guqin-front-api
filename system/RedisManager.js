import log4js from 'log4js';
import redis from 'redis';
import Promise from 'bluebird';
import config from '../config/config';

const redisConfig = config.redis;
const log = log4js.getLogger('RedisManager');

let redisClient;

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export const connectRedisDbServer = () =>
  new Promise((resolve, reject) => {
    const client = redis.createClient(
      process.env.REDIS_PORT || redisConfig.port,
      process.env.REDIS_HOST || redisConfig.host,
    );
    client.on('ready', () => {
      redisClient = client;
      log.info('[Redis]DB connection has been established successfully.');
      resolve();
    });
    client.on('error', err => {
      reject(err);
    });
  });

export const getRedisClient = () => redisClient;

export const getRedisDb = () => 'guqin';
