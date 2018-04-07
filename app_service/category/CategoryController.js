const router = require('koa-router')();
const log = require('log4js').getLogger('CategoryController');
const CategoryService = require('./CategoryService');
const Util = require('../../util/Util');
const RESOLVE = (resolve, reject) => {
    resolve();
}

class CategoryController {
    constructor() {
        this.router = router;
        this.CategoryService = new CategoryService();
        this.router.get('/all', this.getAll.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getAll(ctx, next) {
        await new Promise(RESOLVE).then(() => {
            return this.CategoryService.retrieveAllCategory(ctx.query);
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        })

    }

}

module.exports = CategoryController;