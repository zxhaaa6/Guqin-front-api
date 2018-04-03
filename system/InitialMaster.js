const RedisManager = require('./RedisManager');
const MongodbManager = require('./MongodbManager');
const config = require("../config/config");
const log = require("log4js").getLogger("InitialMaster");
const Util = require('../util/Util');
const _this = exports;
const resolve = function(res) {
    res();
};

_this.initProcess = async function() {
    try {
        log.info("initProcess...");
        await RedisManager.connectRedisDbServer();
        await MongodbManager.connectMongodbServer();
        log.info('✓ initProcess Success');
    } catch (err) {
        Util.throwUpErr(log, err, "initProcess");
    }
};

_this.fillMasterDataCache = async function() {
    try {
        let cacheTotalCount = 1;
        log.info("fillMasterDataCache...");
        // 1. user
        log.info('[1/' + cacheTotalCount + ']initUserCache');
        const UserCacheService = require('../app_service/user/UserCacheService');
        await new UserCacheService().initUserCache();
    } catch (err) {
        Util.throwUpErr(log, err, "fillMasterDataCache");
    }
};