import mongoose from 'mongoose';
import log4js from 'log4js';
import config from '../config/config';

const dbConfig = config.mongodb;
const log = log4js.getLogger('MongodbManager');

export const connectMongodbServer = () => {
  const host = process.env.MONGODB_HOST || dbConfig.host;
  const port = process.env.MONGODB_PORT || dbConfig.port;
  const db = process.env.MONGODB_DB || dbConfig.db;
  const user = process.env.MONGODB_DB_USER;
  const pass = process.env.MONGODB_DB_PASS;

  const authStr = user && pass ? `${user}:${pass}@` : '';
  const uri = `mongodb://${authStr}${host}:${port}/${db}`;
  return mongoose
    .connect(uri, dbConfig.options)
    .then(() => {
      log.info('[Mongodb]DB connection has been established successfully.');
    })
    .catch(err => {
      throw err;
    });
};
