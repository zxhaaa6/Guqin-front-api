const KoaRouter = require('koa-router');
const UserController = require('./app_service/user/UserController');
const ResourceController = require('./app_service/resource/ResourceController');

class Router {
    constructor() {
        this.router = new KoaRouter();
        this.UserController = new UserController();
        this.ResourceController = new ResourceController();

        this.router.use('/user', this.UserController.getRouter().routes(), this.UserController.getRouter().allowedMethods());
        this.router.use('/resource', this.ResourceController.getRouter().routes(), this.ResourceController.getRouter().allowedMethods());
        
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Router;