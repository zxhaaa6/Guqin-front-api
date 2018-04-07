const Util = require('../../util/Util');
const log = require("log4js").getLogger("CategoryService");
const CategoryDao = require('./CategoryDao');

class CategoryService {
    constructor() {
        this.CategoryDao = new CategoryDao();
    }

    async retrieveAllCategory(req) {
        try {
            return await this.CategoryDao.findAllCategorys();
        } catch (err) {
            Util.throwUpErr(log, err, 'retrieveAllCategory');
        }
    }

}

module.exports = CategoryService;