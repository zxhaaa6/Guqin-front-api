module.exports = {
    host: '',
    port: 3300,
    log4js: {
        logging: false
    },
    mongodb: {
        host: "127.0.0.1",
        port: "27017",
        db: "guqin",
        options: {
            autoIndex: false,
            reconnectTries: 20,
            reconnectInterval: 2000, // Reconnect every 500ms
            poolSize: 10 //By default, poolSize is 5
        }
    },
    redis: {
        host: "127.0.0.1",
        port: "6379"
    },
    wechat: {
        // login by wechat
    }
};