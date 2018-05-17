const fs = require('fs');
const log4js = require('log4js');
const config = require('../config/config');
const RedisManager = require('../system/RedisManager');
const MongodbManager = require('../system/MongodbManager');

// ===================== log module =========================
let hasLogDir = fs.existsSync(__dirname + "/../logs");
if (!hasLogDir) {
    fs.mkdirSync(__dirname + "/../logs");
}

if (config.log4js.logging) {
    log4js.configure(__dirname + "/../config/log4js.json", {
        cwd: __dirname + "/../"
    });
}
// ==================== log module =========================

const log = log4js.getLogger('www');

async function startUp() {
    await RedisManager.connectRedisDbServer();
    await MongodbManager.connectMongodbServer();
    // setup app based on Koa
    const App = require('../app');
    const app = new App();
    app.startUpHttpServer();
}

startUp().catch(err => {
    log.error(err);
    log.error("Fatal error was encountered. Guqin-front-api service cannot started.");
    process.exit(0);
})