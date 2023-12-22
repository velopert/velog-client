import { Middleware } from 'koa';
import serverRender from './serverRender';

const ssrMiddleware: Middleware = async (ctx, next) => {
  // redirect to v3 for user posts tab
  if (/^\/@([a-z0-9]+)$/.test(ctx.path)) {
    ctx.redirect(`${ctx.path}/posts`);
    return;
  }

  try {
    const result = await serverRender({
      url: ctx.url,
      cookie: ctx.headers.cookie,
      loggedIn: !!(
        ctx.cookies.get('refresh_token') || ctx.cookies.get('access_token')
      ),
    });
    if (!result) {
      return next();
    }
    ctx.body = result.html;
    ctx.status = result.statusCode;
  } catch (e) {
    ctx.throw(500, e as any);
  }
};

export default ssrMiddleware;
