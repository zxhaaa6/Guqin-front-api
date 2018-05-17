import KoaRouter from 'koa-router';
import log4js from 'log4js';
import CategoryService from './CategoryService';

const log = log4js.getLogger('CategoryController');

const RESOLVE = resolve => {
  resolve();
};

class CategoryController {
  constructor() {
    this.router = KoaRouter();
    this.CategoryService = new CategoryService();
    this.router.get('/all', this.getAll.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async getAll(ctx) {
    await new Promise(RESOLVE)
      .then(() => this.CategoryService.retrieveAllCategory())
      .then(results => ctx.sendJson(log, results))
      .catch(err => ctx.sendError(log, err));
  }
}

export default CategoryController;
