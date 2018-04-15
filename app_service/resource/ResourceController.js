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
        this.router.delete('/', this.deleteResource.bind(this));
        this.router.post('/', this.postResource.bind(this));
        this.router.put('/', this.putResource.bind(this));
    }

    getRouter() {
        return this.router;
    }

    async getAll(ctx, next) {
        await new Promise((resolve, reject) => {
            if (ctx.query) {
                resolve();
            } else {
                reject(Util.genUniError(400, 'params missing'));
            }
        }).then(() => {
            return this.ResourceService.retrieveAllResource(ctx.query);
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        });
    }

    async postResource(ctx, next) {
        await new Promise((resolve, reject) => {
            if (ctx.request.body && ctx.request.body.data) {
                resolve();
            } else {
                reject(Util.genUniError(400, 'params missing'));
            }
        }).then(() => {
            ctx.request.body.data.authorId = ctx.state.user.data._id;
            return this.ResourceService.createResource(ctx.request.body.data);
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        });
    }

    async putResource(ctx, next) {
        await new Promise((resolve, reject) => {
            if (ctx.request.body && ctx.request.body.id && ctx.request.body.data) {
                resolve();
            } else {
                reject(Util.genUniError(400, 'params missing'));
            }
        }).then(() => {
            return this.ResourceService.updateResourceById(ctx.request.body.id, ctx.request.body.data);
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        });
    }

    async deleteResource(ctx, next) {
        await new Promise((resolve, reject) => {
            if (ctx.query && ctx.query.id) {
                resolve();
            } else {
                reject(Util.genUniError(400, 'params missing'));
            }
        }).then(() => {
            return this.ResourceService.deleteResourceById(ctx.query.id);
        }).then(results => {
            return ctx.sendJson(log, results);
        }).catch(err => {
            return ctx.sendError(log, err);
        });
    }

}

module.exports = ResourceController;