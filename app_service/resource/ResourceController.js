const router = require('koa-router')();
const log = require('log4js').getLogger('ResourceController');
const ResourceService = require('./ResourceService');
const Util = require('../../util/Util');
const RESOLVE = (resolve, reject) => {
    resolve();
}

class ResourceController {
    constructor() {
        this.router = router;
        this.ResourceService = new ResourceService();
        this.router.get('/all', this.getAll.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getAll(ctx, next) {
        await new Promise(RESOLVE).then(() => {
            return this.ResourceService.retrieveAllResource();
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        })
        
    }

}

module.exports = ResourceController;