import KoaRouter from 'koa-router';
import log4js from 'log4js';
import { genUniError } from '../../util/Util';
import UserService from './UserService';

const log = log4js.getLogger('UserController');

class UserController {
  constructor() {
    this.router = KoaRouter();
    this.UserService = new UserService();
    this.router.post('/login', this.postLogin.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async postLogin(ctx) {
    const me = this;
    const body = ctx.request.body;
    await new Promise((resolve, reject) => {
      if (body.account && body.password) {
        resolve();
      } else {
        reject(genUniError(400, 'params missing'));
      }
    })
      .then(() => {
        const account = body.account;
        const password = body.password;
        return me.UserService.handleLogin(account, password);
      })
      .then(token => {
        ctx.sendJson(log, { token });
      })
      .catch(err => {
        ctx.sendError(log, err);
      });
  }
}

export default UserController;
