const Util = require('../../util/Util');
const Promise = require('bluebird');
const log = require("log4js").getLogger("TagCacheService");
const TagDao = require('./TagDao');
const RedisManager = require('../../system/RedisManager');
const RedisClient = RedisManager.getRedisClient();
const RedisDb = RedisManager.getRedisDb();
const resolve = function(res) {
    res();
};

class TagCacheService {
    constructor() {
        this.TagDao = new TagDao();
    }

    async initTagCache() {
        try {
            const tags = await this.TagDao.findAllTags();
            await Promise.map(tags, tag => {
                const doc = tag._doc;
                doc._id = doc._id.toString();
                return RedisClient.hmsetAsync(RedisDb + '::tag:' + doc._id, doc);
            });
        } catch (err) {
            Util.throwUpErr(log, err, 'initTagCache');
        }
    }

    async getTag(tagId) {
        return await new Promise((resolve, reject) => {
            if (tagId) {
                tagId = tagId.toString();
                resolve();
            } else {
                reject(Util.genUniError(400, 'tagId can not be null'));
            }
        }).then(() => {
            return RedisClient.hgetallAsync(RedisDb + '::tag:' + tagId);
        }).catch(err => {
            Util.throwUpErr(log, err, 'getTag');
        })
    }

    // setTag(tag) {
    //     return new Promise((resolve, reject) => {
    //         if (tag && tag._id) {
    //             tag._id = tag._id.toString();
    //             resolve();
    //         } else {
    //             reject(Util.genUniError(400, 'tag can not be null'));
    //         }
    //     }).then(() => {
    //         return RedisDb.hmsetAsync('tag:' + tag._id, tag);
    //     }).then(() => {
    //         return tag;
    //     }).catch(err => {
    //         Util.throwUpErr(log, err, 'getTag');
    //     })
    // }

    // updateTag(tagId, updateData) {
    //     let updateArr = [];
    //     return new Promise((resolve, reject) => {
    //         if (tagId) {
    //             tagId = tagId.toString();
    //             for (let key in updateData) {
    //                 let tmp = {
    //                     key: key,
    //                     value: updateData[key]
    //                 };
    //                 updateArr.push(tmp);
    //             }
    //             resolve();
    //         } else {
    //             reject(Util.genUniError(400, 'tagId can not be null'))
    //         }
    //     }).then(() => {
    //         return Promise.map(updateArr, item => {
    //             return RedisDb.hsetAsync('tag:' + tagId, item.key, item.value);
    //         })
    //     }).then(() => {
    //         return tagId;
    //     }).catch(err => {
    //         Util.throwUpErr(log, err, 'getTag');
    //     })
    // }

}

module.exports = TagCacheService;