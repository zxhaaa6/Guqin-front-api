const Util = require('../util/Util');

exports.genFinalMessageStr = function(ctx, code, message) {
    let timeConsumption, ip, method, messagePrefix = '';

    timeConsumption = Date.now() - ctx.hitTime;
    ip = Util.getRequestIp(ctx);
    method = ctx.method;

    if (code < 400) {
        messagePrefix += 'info:';
    } else if (code < 500) {
        messagePrefix += 'warn:';
    } else {
        messagePrefix += 'err:';
    }
    message = messagePrefix + message;

    return '[' + ip + '] ' + '[' + timeConsumption + 'ms] ' + '[' + method + '] ' + '[' + ctx.url + '] [' + code + '] ' + message;
};