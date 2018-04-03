const uuid = require('uuid');

exports.genUniError = function(code, message) {
    let err = new Error(message);
    err.errorCode = code;
    return err;
};

exports.throwUpErr = function(log, err, thisMsg) {
    err.message = log.category + '::' + thisMsg + '->' + err.message;
    throw err;
};

exports.throwErr = function(log, code, message) {
    let err = new Error(log.category + '::' + message);
    err.errorCode = code;
    throw err;

};

exports.generateUuid = function() {
    return uuid.v1().replace(/-/g, '');
};

exports.getRequestIp = function(req) {
    let ip =
        req.headers["x-real-ip"] || //原请求来源ip
        req.headers["x-forwarded-for"] || //有代理时，各阶段ip的逗号分隔值, 最左侧的是原始ip
        req.ip || "";
    //若有多个，取原始IP
    if (ip.split(",").length > 0) {
        ip = ip.split(",")[0];
    }
    //若为内嵌IPv4(如::ffff:192.168.1.101),改为IPv4
    if (ip.split(".").length > 1 && ip.split(":").length > 1) {
        let tmp = ip.split(":");
        ip = tmp[tmp.length - 1];
    }
    return ip;
};

exports.validateEmail = function(email) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

exports.isEmpty = function(value, allowEmptyString) {
    return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false);
};

exports.buildStr = function(strTemplate) {
    let topArgs = arguments;
    return strTemplate.replace(/\{(\d+)\}/g, function() {
        if (topArgs[arguments[1]] && typeof topArgs[arguments[1]] === 'object') {
            return JSON.stringify(topArgs[arguments[1]]);
        } else {
            return topArgs[arguments[1]];
        }
    });
};

/**
 * 随机数
 * @param {Number} down 下限
 * @param {Number} up 上限
 */
exports.genRandom = function(down, up) {
    if (down > up) {
        throw new Error("传入参数有误！");
    }
    return parseInt(Math.random() * (up - down + 1) + down);
};