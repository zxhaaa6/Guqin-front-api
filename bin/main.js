import fs from 'fs';
import log4js from 'log4js';
import config from '../config/config';
import { connectRedisDbServer } from '../system/RedisManager';
import { connectMongodbServer } from '../system/MongodbManager';

// ===================== log module =========================
const hasLogDir = fs.existsSync(`${__dirname}/../logs`);
if (!hasLogDir) {
  fs.mkdirSync(`${__dirname}/../logs`);
}

if (config.log4js.logging) {
  log4js.configure(`${__dirname}/../config/log4js.json`, {
    cwd: `${__dirname}/../`,
  });
}
// ==================== log module =========================

const log = log4js.getLogger('www');

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
