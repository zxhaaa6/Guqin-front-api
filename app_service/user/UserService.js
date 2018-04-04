const jwt = require('jsonwebtoken');
const secret  =require('../../private');
const Util = require('../../util/Util');
const log = require("log4js").getLogger("UserService");
const UserDao = require('./UserDao');

class UserService {
    constructor() {
        this.UserDao = new UserDao();
    }

    async handleLogin(account, password) {
        try {
            const query = {
                phone: account,
                password: password
            };
            const user = await this.UserDao.findOneUser(query);
            if (user) {
                return jwt.sign({ data: user }, secret, { expiresIn: '1h' });
            } else {
                Util.throwErr(log, 401, 'account or pass is wrong');
            }
        } catch (err) {
            Util.throwUpErr(log, err, 'handleLogin');
        }
    }

}

module.exports = UserService;