import { genFinalMessageStr } from './LogService';
import BasicMessage from './HttpMessage';

function sendJson(ctx) {
  /**
   * @param {Object} log
   * @param {String} messageOrData =>> message
   * @param {Object} messageOrData =>> data
   */
  return async (log, messageOrData) => {
    let message;
    let data;
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
        message = 'success';
      }
    }
    if (log) {
      log.info(genFinalMessageStr(ctx, 200, message));
    }
    return (ctx.body = new BasicMessage(true, 200, message, data));
  };
}

function sendPage(ctx) {
  return async (log, templatePath, viewData) => {
    log.info(genFinalMessageStr(ctx, 200, '页面正常打开'));
    return ctx.render(templatePath, viewData);
  };
}

function sendError(ctx) {
  return async (log, error) => {
    if (error.errorCode) {
      const errorCode = error.errorCode;
      let message;
      if (
        errorCode === 400 ||
        errorCode === 401 ||
        errorCode === 404 ||
        errorCode === 403 ||
        errorCode === 406
      ) {
        let messageSegs = error.message.split('::');
        if (messageSegs.length > 1) {
          message = messageSegs[messageSegs.length - 1];
        } else {
          messageSegs = error.message.split('->');
          if (messageSegs.length > 0) {
            message = messageSegs[messageSegs.length - 1];
          }
        }
        if (log) {
          log.info(genFinalMessageStr(ctx, errorCode, error.message));
        }
        return (ctx.body = new BasicMessage(
          false,
          errorCode,
          BasicMessage.genMessageTitle(errorCode) + message,
        ));
      }
      if (log) {
        log.error(genFinalMessageStr(ctx, 500, error.message));
        log.error(error);
      }
      return (ctx.body = new BasicMessage(
        false,
        500,
        BasicMessage.genMessageTitle(500),
      ));
    }
    if (log) {
      log.error(genFinalMessageStr(ctx, 500, error.message));
      log.error(error);
    }
    return (ctx.body = new BasicMessage(
      false,
      500,
      BasicMessage.genMessageTitle(500),
    ));
  };
}

export default async (ctx, next) => {
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
};
