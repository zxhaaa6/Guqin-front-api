import uuid from 'uuid';
import mongoose from 'mongoose';

export const checkObjectId = id => mongoose.Types.ObjectId.isValid(id);

export const genUniError = (code, message) => {
  const err = new Error(message);
  err.errorCode = code;
  return err;
};

export const throwUpErr = (log, err, thisMsg) => {
  err.message = `${log.category}::${thisMsg}->${err.message}`;
  throw err;
};

export const throwErr = (log, code, message) => {
  const err = new Error(`${log.category}::${message}`);
  err.errorCode = code;
  throw err;
};

export const generateUuid = () => uuid.v1().replace(/-/g, '');

export const getRequestIp = req => {
  let ip =
    req.headers['x-real-ip'] || // 原请求来源ip
    req.headers['x-forwarded-for'] || // 有代理时，各阶段ip的逗号分隔值, 最左侧的是原始ip
    req.ip ||
    '';
  // 若有多个，取原始IP
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0];
  }
  // 若为内嵌IPv4(如::ffff:192.168.1.101),改为IPv4
  if (ip.split('.').length > 1 && ip.split(':').length > 1) {
    const tmp = ip.split(':');
    ip = tmp[tmp.length - 1];
  }
  return ip;
};

export const validateEmail = email => {
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};

export const isEmpty = (value, allowEmptyString) =>
  value === null ||
  value === undefined ||
  (!allowEmptyString ? value === '' : false);

export const buildStr = strTemplate => {
  const topArgs = arguments;
  return strTemplate.replace(/\{(\d+)\}/g, () => {
    if (topArgs[arguments[1]] && typeof topArgs[arguments[1]] === 'object') {
      return JSON.stringify(topArgs[arguments[1]]);
    }
    return topArgs[arguments[1]];
  });
};

/**
 * 随机数
 * @param {Number} down 下限
 * @param {Number} up 上限
 */
export const genRandom = (down, up) => {
  if (down > up) {
    throw new Error('传入参数有误！');
  }
  return parseInt(Math.random() * (up - down + 1) + down);
};
