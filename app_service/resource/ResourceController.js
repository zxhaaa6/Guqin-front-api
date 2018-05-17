import KoaRouter from 'koa-router';
import log4js from 'log4js';
import ResourceService from './ResourceService';
import { genUniError } from '../../util/Util';

const log = log4js.getLogger('ResourceController');

class ResourceController {
  constructor() {
    this.router = KoaRouter();
    this.ResourceService = new ResourceService();
    this.router.get('/all', this.getAll.bind(this));
    this.router.delete('/', this.deleteResource.bind(this));
    this.router.post('/', this.postResource.bind(this));
    this.router.put('/', this.putResource.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async getAll(ctx) {
    await new Promise((resolve, reject) => {
      if (ctx.query) {
        resolve();
      } else {
        reject(genUniError(400, 'params missing'));
      }
    })
      .then(() => this.ResourceService.retrieveAllResource(ctx.query))
      .then(results => ctx.sendJson(log, results))
      .catch(err => ctx.sendError(log, err));
  }

  async postResource(ctx) {
    await new Promise((resolve, reject) => {
      if (ctx.request.body && ctx.request.body.data) {
        resolve();
      } else {
        reject(genUniError(400, 'params missing'));
      }
    })
      .then(() => {
        ctx.request.body.data.authorId = ctx.state.user.data._id;
        return this.ResourceService.createResource(ctx.request.body.data);
      })
      .then(results => ctx.sendJson(log, results))
      .catch(err => ctx.sendError(log, err));
  }

  async putResource(ctx) {
    await new Promise((resolve, reject) => {
      if (ctx.request.body && ctx.request.body.id && ctx.request.body.data) {
        resolve();
      } else {
        reject(genUniError(400, 'params missing'));
      }
    })
      .then(() =>
        this.ResourceService.updateResourceById(
          ctx.request.body.id,
          ctx.request.body.data,
        ),
      )
      .then(results => ctx.sendJson(log, results))
      .catch(err => ctx.sendError(log, err));
  }

  async deleteResource(ctx) {
    await new Promise((resolve, reject) => {
      if (ctx.query && ctx.query.id) {
        resolve();
      } else {
        reject(genUniError(400, 'params missing'));
      }
    })
      .then(() => this.ResourceService.deleteResourceById(ctx.query.id))
      .then(results => ctx.sendJson(log, results))
      .catch(err => ctx.sendError(log, err));
  }
}

export default ResourceController;
