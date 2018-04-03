const Util = require('../../util/Util');
const log = require("log4js").getLogger("UserDao");
const AbstractDao = require('../_abstract/AbstractDao');
const UserModel = require('../../app_model/User');

class UserDao extends AbstractDao {
    constructor() {
        super(UserModel);
    }

    async findUserById(id) {
        try {
            return await this.findDocumentById(id);
        } catch (err) {
            Util.throwUpErr(log, err, 'findUserById');
        }
    }

    async findAllUsers() {
        try {
            const query = { active: true };
            return await this.findDocuments(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'findAllUsers');
        }
    }

    async findOneUser(query) {
        try {
            return await this.findOneDocument(query);
        } catch (err) {
            Util.throwUpErr(log, err, 'findOneUser');
        }
    }

}

module.exports = UserDao;