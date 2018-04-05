const Util = require('../../util/Util');
const Promise = require('bluebird');
const log = require("log4js").getLogger("CategoryCacheService");
const CategoryDao = require('./CategoryDao');
const RedisManager = require('../../system/RedisManager');
const RedisClient = RedisManager.getRedisClient();
const RedisDb = RedisManager.getRedisDb();
const resolve = function(res) {
    res();
};

class CategoryCacheService {
    constructor() {
        this.CategoryDao = new CategoryDao();
    }

    async initCategoryCache() {
        try {
            const categorys = await this.CategoryDao.findAllCategorys();
            await Promise.map(categorys, category => {
                const doc = category._doc;
                doc._id = doc._id.toString();
                return RedisClient.hmsetAsync(RedisDb + '::category:' + doc._id, doc);
            });
        } catch (err) {
            Util.throwUpErr(log, err, 'initCategoryCache');
        }
    }

    async getCategory(categoryId) {
        return await new Promise((resolve, reject) => {
            if (categoryId) {
                categoryId = categoryId.toString();
                resolve();
            } else {
                reject(Util.genUniError(400, 'categoryId can not be null'));
            }
        }).then(() => {
            return RedisClient.hgetallAsync(RedisDb + '::category:' + categoryId);
        }).catch(err => {
            Util.throwUpErr(log, err, 'getCategory');
        })
    }

    // setCategory(category) {
    //     return new Promise((resolve, reject) => {
    //         if (category && category._id) {
    //             category._id = category._id.toString();
    //             resolve();
    //         } else {
    //             reject(Util.genUniError(400, 'category can not be null'));
    //         }
    //     }).then(() => {
    //         return RedisDb.hmsetAsync('category:' + category._id, category);
    //     }).then(() => {
    //         return category;
    //     }).catch(err => {
    //         Util.throwUpErr(log, err, 'getCategory');
    //     })
    // }

    // updateCategory(categoryId, updateData) {
    //     let updateArr = [];
    //     return new Promise((resolve, reject) => {
    //         if (categoryId) {
    //             categoryId = categoryId.toString();
    //             for (let key in updateData) {
    //                 let tmp = {
    //                     key: key,
    //                     value: updateData[key]
    //                 };
    //                 updateArr.push(tmp);
    //             }
    //             resolve();
    //         } else {
    //             reject(Util.genUniError(400, 'categoryId can not be null'))
    //         }
    //     }).then(() => {
    //         return Promise.map(updateArr, item => {
    //             return RedisDb.hsetAsync('category:' + categoryId, item.key, item.value);
    //         })
    //     }).then(() => {
    //         return categoryId;
    //     }).catch(err => {
    //         Util.throwUpErr(log, err, 'getCategory');
    //     })
    // }

}

module.exports = CategoryCacheService;