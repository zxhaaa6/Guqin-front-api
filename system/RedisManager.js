import log4js from 'log4js';
import redis from 'redis';
import Promise from 'bluebird';
import config from '../config/config';

const log = log4js.getLogger('RedisManager');
const dbConfig = config.redis;

let redisClient;

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export const connectRedisDbServer = () =>
  new Promise((resolve, reject) => {
    const client = redis.createClient(dbConfig.port, dbConfig.host);
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
