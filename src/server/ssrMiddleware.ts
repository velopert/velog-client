import { Middleware } from 'koa';
import serverRender from './serverRender';

const ssrMiddleware: Middleware = async (ctx, next) => {
  try {
    const html = await serverRender({
      url: ctx.url,
      cookie: ctx.headers.cookie,
      loggedIn: !!(
        ctx.cookies.get('refresh_token') || ctx.cookies.get('access_token')
      ),
    });
    if (!html) {
      return next();
    }
    ctx.body = html;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export default ssrMiddleware;
