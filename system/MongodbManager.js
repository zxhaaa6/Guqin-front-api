const mongoose = require('mongoose');
const dbConfig = require('../config/config').mongodb;
const log = require('log4js').getLogger('MongodbManager');

exports.connectMongodbServer = function() {
    let uri = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.db;
    return mongoose.connect(uri, dbConfig.options).then(() => {
        log.info('[Mongodb]DB connection has been established successfully.');
    }).catch(err => {
        throw err;
    });
};