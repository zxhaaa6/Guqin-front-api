import log4js from 'log4js';
import * as Util from '../../util/Util';
import AbstractDao from '../_abstract/AbstractDao';
import TagModel from '../../app_model/Tag';

const log = log4js.getLogger('TagDao');

class TagDao extends AbstractDao {
  constructor() {
    super(TagModel);
  }

  async findTagById(id) {
    try {
      return await this.findDocumentById(id);
    } catch (err) {
      Util.throwUpErr(log, err, 'findTagById');
    }
  }

  async findAllTags() {
    try {
      const query = { active: true };
      return await this.findDocuments(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'findAllTags');
    }
  }

  async findOneTag(query) {
    try {
      return await this.findOneDocument(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'findOneTag');
    }
  }
}

export default TagDao;
