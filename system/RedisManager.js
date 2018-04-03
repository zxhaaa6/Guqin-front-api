const log = require('log4js').getLogger('RedisManager');
const Promise = require('bluebird');
const redis = require("redis");
const dbConfig = require('../config/config').redis;
const _this = exports;
let redisClient;

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

_this.connectRedisDbServer = function() {
    return new Promise(function (resolve, reject) {
        let client = redis.createClient(dbConfig.port, dbConfig.host);
        client.on("ready", function () {
            redisClient = client;
            log.info('[Redis]DB connection has been established successfully.');
            resolve();
        });
        client.on("error", function (err) {
            reject(err);
        });
    });

};

_this.getRedisClient = function() {
    return redisClient;
}

_this.getRedisDb = function() {
    return 'guqin';
};