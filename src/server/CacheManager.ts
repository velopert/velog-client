import Redis from 'ioredis';
import checkCacheRule from './checkCacheRule';

export const redis = new Redis({
  host: process.env.REACT_APP_REDIS_HOST || 'localhost',
});

function createCacheKey(url: string) {
  return `ssr:${url}`;
}

export default class CacheManager {
  async get(url: string) {
    try {
      const html = await redis.get(createCacheKey(url));
      return html;
    } catch (e) {
      return null;
    }
  }
  async set(url: string, html: string) {
    const rule = checkCacheRule(url);
    if (!rule) return;
    await redis.set(createCacheKey(url), html);
    await redis.expire(createCacheKey(url), 300);
  }
}
