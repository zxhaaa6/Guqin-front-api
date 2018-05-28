import log4js from 'log4js';
import * as Util from '../../util/Util';
import AbstractDao from '../_abstract/AbstractDao';
import UserModel from '../../app_model/User';

const log = log4js.getLogger('UserDao');

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

export default UserDao;
