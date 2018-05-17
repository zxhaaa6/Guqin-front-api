import log4js from 'log4js';
import * as Util from '../../util/Util';
import AbstractDao from '../_abstract/AbstractDao';
import CategoryModel from '../../app_model/Category';

const log = log4js.getLogger('CategoryDao');

class CategoryDao extends AbstractDao {
  constructor() {
    super(CategoryModel);
  }

  async findCategoryById(id) {
    try {
      return await this.findDocumentById(id);
    } catch (err) {
      Util.throwUpErr(log, err, 'findCategoryById');
    }
  }

  async findAllCategorys() {
    try {
      const query = { active: true };
      return await this.findDocuments(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'findAllCategorys');
    }
  }

  async findOneCategory(query) {
    try {
      return await this.findOneDocument(query);
    } catch (err) {
      Util.throwUpErr(log, err, 'findOneCategory');
    }
  }
}

export default CategoryDao;
