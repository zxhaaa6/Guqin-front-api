import Promise from 'bluebird';
import log4js from 'log4js';
import * as Util from '../../util/Util';
import UserDao from './UserDao';
import { getRedisClient, getRedisDb } from '../../system/RedisManager';

const log = log4js.getLogger('UserCacheService');

const RedisClient = getRedisClient();
const RedisDb = getRedisDb();

class UserCacheService {
  constructor() {
    this.UserDao = new UserDao();
  }

  async initUserCache() {
    try {
      const users = await this.UserDao.findAllUsers();
      await Promise.map(users, user => {
        const doc = user._doc;
        doc._id = doc._id.toString();
        return RedisClient.hmsetAsync(`${RedisDb}::user:${doc._id}`, doc);
      });
    } catch (err) {
      Util.throwUpErr(log, err, 'initUserCache');
    }
  }

  async getUser(userId) {
    return new Promise((resolve, reject) => {
      if (userId) {
        userId = userId.toString();
        resolve();
      } else {
        reject(Util.genUniError(400, 'userId can not be null'));
      }
    })
      .then(() => RedisClient.hgetallAsync(`${RedisDb}::user:${userId}`))
      .catch(err => {
        Util.throwUpErr(log, err, 'getUser');
      });
  }

  // setUser(user) {
  //     return new Promise((resolve, reject) => {
  //         if (user && user._id) {
  //             user._id = user._id.toString();
  //             resolve();
  //         } else {
  //             reject(Util.genUniError(400, 'user can not be null'));
  //         }
  //     }).then(() => {
  //         return RedisDb.hmsetAsync('user:' + user._id, user);
  //     }).then(() => {
  //         return user;
  //     }).catch(err => {
  //         Util.throwUpErr(log, err, 'getUser');
  //     })
  // }

  // updateUser(userId, updateData) {
  //     let updateArr = [];
  //     return new Promise((resolve, reject) => {
  //         if (userId) {
  //             userId = userId.toString();
  //             for (let key in updateData) {
  //                 let tmp = {
  //                     key: key,
  //                     value: updateData[key]
  //                 };
  //                 updateArr.push(tmp);
  //             }
  //             resolve();
  //         } else {
  //             reject(Util.genUniError(400, 'userId can not be null'))
  //         }
  //     }).then(() => {
  //         return Promise.map(updateArr, item => {
  //             return RedisDb.hsetAsync('user:' + userId, item.key, item.value);
  //         })
  //     }).then(() => {
  //         return userId;
  //     }).catch(err => {
  //         Util.throwUpErr(log, err, 'getUser');
  //     })
  // }
}

export default UserCacheService;
