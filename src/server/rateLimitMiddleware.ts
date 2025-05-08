import { Middleware } from 'koa';
import { redis } from './CacheManager';

const parseNumber = (value: string | null) => {
  if (value === null) return null;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return null;
  return parsed;
};

const rateLimitMiddleware: Middleware = async (ctx, next) => {
  const ip = ctx.request.ips.slice(-1)[0] || ctx.request.ip;

  const isBlockedUrl = await redis.get(`${ctx.url}:blocked`);
  if (isBlockedUrl === '1') {
    ctx.status = 429;
    ctx.body = { msg: 'Too many request' };
    return;
  }

  const key = `${ip}:pageview`;
  const blockedKey = `${ip}:blocked`;

  const blocked = await redis.get(blockedKey);

  if (parseNumber(blocked) === 1) {
    ctx.status = 429;
    ctx.body = { msg: 'Too many request' };
    return;
  }
  const exists = await redis.get(key);
  const parsed = parseNumber(exists);

  if (parsed !== null && parsed >= 100) {
    console.log(`Blocking... ${ip} - ${exists}`);
    await redis.set(blockedKey, 1);
    await redis.expire(blockedKey, 300);
    ctx.status = 429;
    ctx.body = { msg: 'Too many request' };
    return;
  }

  if (exists === null) {
    await redis.set(key, 1);
    await redis.expire(key, 60);
  } else {
    console.log(`${ip} - ${exists}`);
    await redis.incr(key);
  }
  return next();
};

export default rateLimitMiddleware;
