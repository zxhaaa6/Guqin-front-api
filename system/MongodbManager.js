import mongoose from 'mongoose';
import log4js from 'log4js';
import config from '../config/config';

const dbConfig = config.mongodb;
const log = log4js.getLogger('MongodbManager');

export const connectMongodbServer = () => {
  const host = process.env.MONGODB_HOST;
  const port = process.env.MONGODB_PORT;
  const db = process.env.MONGODB_DB;
  const user = process.env.MONGODB_DB_USER;
  const pass = process.env.MONGODB_DB_PASS;

  const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`;
  return mongoose
    .connect(uri, dbConfig)
    .then(() => {
      log.info('[Mongodb]DB connection has been established successfully.');
    })
    .catch(err => {
      throw err;
    });
};
