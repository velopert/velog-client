import { Middleware } from 'koa';
import { redis } from './CacheManager';

const rateLimitMiddleware: Middleware = async (ctx, next) => {
  const ip = ctx.request.ips.slice(-1)[0] || ctx.request.ip;

  const key = `${ip}:pageview`;
  const blockedKey = `${ip}:blocked`;

  const blocked = await redis.get(blockedKey);

  if (blocked) {
    ctx.status = 429;
    ctx.body = { msg: 'Too many request' };
    return;
  }
  const exists = await redis.get(key);

  if (typeof exists === 'number' && exists > 100) {
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
