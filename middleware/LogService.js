import { getRequestIp } from '../util/Util';

export const genFinalMessageStr = (ctx, code, message) => {
  let messagePrefix = '';

  const timeConsumption = Date.now() - ctx.hitTime;
  const ip = getRequestIp(ctx);
  const { method } = ctx.method;

  if (code < 400) {
    messagePrefix += 'info:';
  } else if (code < 500) {
    messagePrefix += 'warn:';
  } else {
    messagePrefix += 'err:';
  }
  message = messagePrefix + message;

  return `[${ip}] [${timeConsumption}ms] [${method}] [${
    ctx.url
  }] [${code}] ${message}`;
};
