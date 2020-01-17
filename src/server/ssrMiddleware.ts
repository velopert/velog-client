import { Middleware } from 'koa';
import serverRender from './serverRender';

const ssrMiddleware: Middleware = async (ctx, next) => {
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
    ctx.throw(500, e);
  }
};

export default ssrMiddleware;
