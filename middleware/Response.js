const LogService = require('./LogService');
const HttpMessage = require('./HttpMessage');

function sendJson(ctx) {
    /**
     * @param {Object} log
     * @param {String} messageOrData =>> message
     * @param {Object} messageOrData =>> data
     */
    return async (log, messageOrData) => {
        let message, data;
        if (!messageOrData) {
            messageOrData = '';
        }
        if (messageOrData.constructor === String) {
            message = messageOrData;
        } else {
            data = messageOrData;
            if (data && data.message) {
                message = messageOrData.message;
            } else {
                message = "success";
            }
        }
        if (log) {
            log.info(LogService.genFinalMessageStr(ctx, 200, message));
        }
        return ctx.body = new HttpMessage.BasicMessage(true, 200, message, data);
    }
}

function sendPage(ctx) {
    return async (log, templatePath, viewData) => {
        log.info(LogService.genFinalMessageStr(ctx, 200, '页面正常打开'));
        return await ctx.render(templatePath, viewData);
    }
}

function sendError(ctx) {
    return async (log, error) => {
        if (error.errorCode) {
            let errorCode = error.errorCode,
                message;
            if (errorCode === 400 || errorCode === 401 || errorCode === 404 || errorCode === 403 || errorCode === 406) {
                let messageSegs = error.message.split("::");
                if (messageSegs.length > 1) {
                    message = messageSegs[messageSegs.length - 1];
                } else {
                    messageSegs = error.message.split("->");
                    if (messageSegs.length > 0) {
                        message = messageSegs[messageSegs.length - 1];
                    }
                }
                if (log) {
                    log.info(LogService.genFinalMessageStr(ctx, errorCode, error.message));
                }
                return ctx.body = new HttpMessage.BasicMessage(false, errorCode, HttpMessage.genMessageTitle(errorCode) + message);
            } else {
                if (log) {
                    log.error(LogService.genFinalMessageStr(ctx, 500, error.message));
                    log.error(error);
                }
                return ctx.body = new HttpMessage.BasicMessage(false, 500, HttpMessage.genMessageTitle(500));
            }
        } else {
            if (log) {
                log.error(LogService.genFinalMessageStr(ctx, 500, error.message));
                log.error(error);
            }
            return ctx.body = new HttpMessage.BasicMessage(false, 500, HttpMessage.genMessageTitle(500));
        }
    }
}

module.exports = async function(ctx, next) {
    if (!ctx.sendJson) {
        ctx.sendJson = sendJson(ctx);
    }
    if (!ctx.sendPage) {
        ctx.sendPage = sendPage(ctx);
    }
    if (!ctx.sendError) {
        ctx.sendError = sendError(ctx);
    }
    await next();
}