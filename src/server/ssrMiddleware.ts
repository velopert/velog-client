import { Middleware } from 'koa';
import serverRender from './serverRender';
import CacheManager from './CacheManager';

const cache = new CacheManager();

const ssrMiddleware: Middleware = async (ctx, next) => {
  const ip = ctx.request.ips.slice(-1)[0] || ctx.request.ip;
  // redirect to v3 for user posts tab
  if (/^\/@([a-z0-9]+)$/.test(ctx.path)) {
    ctx.redirect(`${ctx.path}/posts`);
    return;
  }

  const isLoggedIn = !!(
    ctx.cookies.get('refresh_token') || ctx.cookies.get('access_token')
  );

  if (!isLoggedIn) {
    const exists = await cache.get(ctx.url);
    if (exists !== null) {
      return exists;
    }
  }

  try {
    const result = await serverRender({
      url: ctx.url,
      cookie: ctx.headers.cookie,
      loggedIn: isLoggedIn,
    });
    if (!result) {
      return next();
    }
    ctx.body = result.html;
    ctx.status = result.statusCode;

    if (!isLoggedIn) {
      await cache.set(ctx.url, result.html ?? '');
    }
  } catch (e) {
    ctx.throw(500, e as any);
  }
  console.log(ip + ' << ' + ctx.url);
};

export default ssrMiddleware;
