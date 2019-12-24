import Redis from 'ioredis';
import checkCacheRule from './checkCacheRule';

const redis = new Redis();

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
  set(url: string, html: string) {
    const rule = checkCacheRule(url);
    if (!rule) return;
    return redis.set(createCacheKey(url), html);
  }
}
