import jwt from 'jsonwebtoken';
import log4js from 'log4js';
import secret from '../../private';
import * as Util from '../../util/Util';
import UserDao from './UserDao';

const log = log4js.getLogger('UserService');

class UserService {
  constructor() {
    this.UserDao = new UserDao();
  }

  async handleLogin(account, password) {
    try {
      const query = {
        phone: account,
        password,
      };
      const user = await this.UserDao.findOneUser(query);
      if (user) {
        return jwt.sign({ data: user }, secret, { expiresIn: '1h' });
      }
      Util.throwErr(log, 401, 'account or pass is wrong');
    } catch (err) {
      Util.throwUpErr(log, err, 'handleLogin');
    }
  }
}

export default UserService;
