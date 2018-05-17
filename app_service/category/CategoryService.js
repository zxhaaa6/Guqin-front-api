import log4js from 'log4js';
import * as Util from '../../util/Util';
import CategoryDao from './CategoryDao';

const log = log4js.getLogger('CategoryService');

class CategoryService {
  constructor() {
    this.CategoryDao = new CategoryDao();
  }

  async retrieveAllCategory() {
    try {
      return await this.CategoryDao.findAllCategorys();
    } catch (err) {
      Util.throwUpErr(log, err, 'retrieveAllCategory');
    }
  }
}

export default CategoryService;
