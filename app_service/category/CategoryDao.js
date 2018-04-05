const Util = require('../../util/Util');
const log = require("log4js").getLogger("CategoryDao");
const AbstractDao = require('../_abstract/AbstractDao');
const CategoryModel = require('../../app_model/Category');

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

module.exports = CategoryDao;