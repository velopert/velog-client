import { Middleware } from 'koa';
import { redis } from './CacheManager';
import GoogleBotIPCache from './crawlerCheck';

const cache = new GoogleBotIPCache(); // 기본 TTL 1시간
async function main() {
  try {
    const docs = await cache.getRawDocs();
    console.log('[googlebot] prefixes:', docs.googlebot.prefixes.length);
    console.log('[userFetchers] prefixes:', docs.userFetchers.prefixes.length);

    const cidrs = await cache.getAllCIDRs();
    console.log('Total unique CIDRs:', cidrs.length);
  } catch (e) {
    console.error('[GoogleCrawlIPCache] error:', e);
  }
}

main();

const parseNumber = (value: string | null) => {
  if (value === null) return null;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) return null;
  return parsed;
};

const WHITELIST_IPS = (process.env.REACT_APP_WHITELIST_IPS ?? '')
  .split(',')
  .map((ip) => ip.trim());

console.log({ WHITELIST_IPS });

const rateLimitMiddleware: Middleware = async (ctx, next) => {
  const ip = ctx.request.ips.slice(-1)[0] || ctx.request.ip;

  if (
    WHITELIST_IPS.length > 0 &&
    WHITELIST_IPS.some((whitelistIp) => ip.includes(whitelistIp))
  ) {
    return next();
  }

  const isCrawler = await cache.isCrawlerIP(ip);
  if (isCrawler) {
    return next();
  } else {
    console.log(`[${ip}] is not a crawler`);
  }

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

  if (parsed !== null && parsed >= 300) {
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
