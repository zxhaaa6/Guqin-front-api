import KoaRouter from 'koa-router';
import log4js from 'log4js';
import TagService from './TagService';

const log = log4js.getLogger('TagController');

const RESOLVE = resolve => {
  resolve();
};

class TagController {
  constructor() {
    this.router = KoaRouter();
    this.TagService = new TagService();
    this.router.get('/all', this.getAll.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async getAll(ctx) {
    await new Promise(RESOLVE)
      .then(() => this.TagService.retrieveAllTag(ctx.query))
      .then(results => ctx.sendJson(log, results))
      .catch(err => ctx.sendError(log, err));
  }
}

export default TagController;
