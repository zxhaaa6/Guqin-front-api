import mongoose from 'mongoose';
import log4js from 'log4js';
import config from '../config/config';

const dbConfig = config.mongodb;
const log = log4js.getLogger('MongodbManager');

export const connectMongodbServer = () => {
  const uri = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`;
  return mongoose
    .connect(uri, dbConfig.options)
    .then(() => {
      log.info('[Mongodb]DB connection has been established successfully.');
    })
    .catch(err => {
      throw err;
    });
};
