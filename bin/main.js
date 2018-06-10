import { configure, getLogger } from 'log4js';
import config from '../config/config';
import { connectRedisDbServer } from '../system/RedisManager';
import { connectMongodbServer } from '../system/MongodbManager';

// ===================== log module =========================
if (config.log4js.logging) {
  configure(`${__dirname}/../config/log4js.json`);
} else {
  configure({
    appenders: {
      console: {
        type: 'console',
        layout: {
          type: 'pattern',
          pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] %m%]',
        },
      },
    },
    categories: { default: { appenders: ['console'], level: 'info' } },
  });
}
// ==================== log module =========================

const log = getLogger('www');

async function startUp() {
  await connectRedisDbServer();
  await connectMongodbServer();
  // setup app based on Koa, must required after redis and mongodb have connected.
  const App = require('../app');
  const app = new App();
  app.startUpHttpServer();
}

startUp().catch(err => {
  log.error(err);
  log.error(
    'Fatal error was encountered. Guqin-front-api service cannot started.',
  );
  process.exit(0);
});
