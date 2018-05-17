import KoaRouter from 'koa-router';
import UserController from './app_service/user/UserController';
import CategoryController from './app_service/category/CategoryController';
import TagController from './app_service/tag/TagController';
import ResourceController from './app_service/resource/ResourceController';

class Router {
  constructor() {
    this.router = new KoaRouter();
    this.UserController = new UserController();
    this.CategoryController = new CategoryController();
    this.TagController = new TagController();
    this.ResourceController = new ResourceController();

    this.router.use(
      '/user',
      this.UserController.getRouter().routes(),
      this.UserController.getRouter().allowedMethods(),
    );
    this.router.use(
      '/category',
      this.CategoryController.getRouter().routes(),
      this.CategoryController.getRouter().allowedMethods(),
    );
    this.router.use(
      '/tag',
      this.TagController.getRouter().routes(),
      this.TagController.getRouter().allowedMethods(),
    );
    this.router.use(
      '/resource',
      this.ResourceController.getRouter().routes(),
      this.ResourceController.getRouter().allowedMethods(),
    );
  }

  getRouter() {
    return this.router;
  }
}

export default Router;
