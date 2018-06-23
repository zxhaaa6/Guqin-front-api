export default {
  host: '',
  port: 3300,
  log4js: {
    logging: false,
  },
  mongodb: {
    autoIndex: false,
    reconnectTries: 20,
    reconnectInterval: 2000, // Reconnect every 500ms
    poolSize: 10, // By default, poolSize is 5
  },
  wechat: {
    // login by wechat
  },
};
