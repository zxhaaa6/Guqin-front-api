import log4js from 'log4js';
import * as Util from '../../util/Util';
import TagDao from './TagDao';

const log = log4js.getLogger('TagService');

class TagService {
  constructor() {
    this.TagDao = new TagDao();
  }

  async retrieveAllTag() {
    try {
      return await this.TagDao.findAllTags();
    } catch (err) {
      Util.throwUpErr(log, err, 'retrieveAllTag');
    }
  }
}

export default TagService;
