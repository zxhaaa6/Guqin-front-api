const router = require('koa-router')();
const log = require('log4js').getLogger('UserController');
const UserService = require('./UserService');
const Util = require('../../util/Util');
const RESOLVE = (resolve, reject) => {
    resolve();
}

class UserController {
    constructor() {
        this.router = router;
        this.UserService = new UserService();
        this.router.post('/login', this.postLogin.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async postLogin(ctx, next) {
        const _this = this;
        const body = ctx.request.body;
        await new Promise((resolve, reject) => {
            if(body.account && body.password) {
                resolve();
            }else{
                reject(Util.genUniError(400, 'params missing'));
            }
        }).then(() => {
            const account = body.account;
            const password = body.password;
            return _this.UserService.handleLogin(account, password);
        }).then(token => {
            ctx.sendJson(log, {token});
        }).catch(err => {
            ctx.sendError(log, err);
        })
    }
}

module.exports = UserController;