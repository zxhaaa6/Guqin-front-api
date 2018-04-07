const router = require('koa-router')();
const log = require('log4js').getLogger('TagController');
const TagService = require('./TagService');
const Util = require('../../util/Util');
const RESOLVE = (resolve, reject) => {
    resolve();
}

class TagController {
    constructor() {
        this.router = router;
        this.TagService = new TagService();
        this.router.get('/all', this.getAll.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getAll(ctx, next) {
        await new Promise(RESOLVE).then(() => {
            return this.TagService.retrieveAllTag(ctx.query);
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        })

    }

}

module.exports = TagController;