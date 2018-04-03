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
            if(user){
                
            }
        } catch (err) {
            Util.throwUpErr(log, err, 'handleLogin');
        }
    }

}

module.exports = UserService;