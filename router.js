const KoaRouter = require('koa-router');
const UserController = require('./app_service/user/UserController');

class Router {
    constructor() {
        this.router = new KoaRouter();
        this.UserController = new UserController();

        this.router.use('/user', this.UserController.getRouter().routes(), this.UserController.getRouter().allowedMethods());
        
    }

    getRouter() {
        return this.router;
    }
}

module.exports = Router;