import path from 'path';
import Koa from 'koa';
import cors from '@koa/cors';
import Bodyparser from 'koa-bodyparser';
import Jwt from 'koa-jwt';
import Session from 'koa-session';
import Static from 'koa-static';
import log4js from 'log4js';
import http from 'http';
import Router from './router';
import secret from './private';
import config from './config/config';
import SessionStore from './middleware/SessionStore';
import Response from './middleware/Response';

const log = log4js.getLogger('App');

class App {
  constructor() {
    this.app = new Koa();
    /* ===================== middlewares ====================== */
    this.app.use(cors());
    this.app.keys = [
      'this is a koa signed Cookie secret',
      'i like Guqin-front-api',
    ];
    // this.app.use(Logger());
    this.app.use(
      Session(
        {
          maxAge: 86400000,
          store: new SessionStore(),
        },
        this.app,
      ),
    );
    this.app.use(Bodyparser());
    this.app.use(Static(path.join(__dirname, '/public')));

    // X-Response-Time
    this.app.use(async (ctx, next) => {
      ctx.hitTime = Date.now();
      await next();
      const ms = Date.now() - ctx.hitTime;
      ctx.set('X-Response-Time', `${ms}ms`);
    });
    this.app.use((ctx, next) =>
      next().catch(err => {
        if (err.status === 401) {
          ctx.status = 401;
          ctx.body = 'Protected resource, need Authorization.';
        } else {
          throw err;
        }
      }),
    );
    // response
    this.app.use(Response);

    this.app.use(
      Jwt({ secret }).unless({ path: [/^\/public/, /^\/user\/login/] }),
    );
    // Routes
    this.useAllRoutes();

    this.app.on('error', err => {
      log.error(err);
    });
  }

  useAllRoutes() {
    this.router = new Router();
    this.app.use(
      this.router.getRouter().routes(),
      this.router.getRouter().allowedMethods(),
    );
  }

  useAllModel() {
    // app.use(async (ctx, next) => {
    //     if (!ctx.model)
    //         ctx.model = require('./models');
    //     await next();
    // });
  }

  startUpHttpServer() {
    this.port = this.normalizePort(config.port || '3300');
    this.server = http.createServer(this.app.callback());
    this.server.listen(this.port);
    this.server.on('error', err => {
      this.reportError(err);
    });
    this.server.on('listening', () => {
      this.reportListening('http');
    });
  }

  normalizePort(val) {
    const port = parseInt(val, 10);
    if (port >= 0) {
      return port;
    }
    return false;
  }

  reportListening(type) {
    const addr = this.server.address();
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    log.info(`✓ Listening on [${type}] ${bind}`);
    if (process.env.NODE_ENV === 'production') {
      log.info(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    } else {
      log.warn(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    }
    log.info('-----= Guqin Service Startup Success =-----');
  }

  reportError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        log.error(`Port ${this.port} requires elevated privileges.`);
        log.error('-----= Guqin Service Startup Failed =-----');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        log.error(`Port ${this.port} is already in use.`);
        log.error('-----= Guqin Service Startup Failed =-----');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}

export default App;
