import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import proxy from 'koa-better-http-proxy';
import Router from '@koa/router';
import ssrMiddleware from './server/ssrMiddleware';

console.log(process.env.REACT_APP_SSR);

const app = new Koa();
const router = new Router();

app.use(
  serve(path.resolve('./build'), {
    index: false,
  }),
);

const proxyMiddleware = proxy(
  process.env.REACT_APP_API_HOST ?? 'http://localhost:5000',
  {},
);

app.use(router.routes()).use(router.allowedMethods());
app.use(ssrMiddleware);
app.use(proxyMiddleware);
router.get('/ads.txt', (ctx) => {
  ctx.body = `google.com, pub-9161852896103498, DIRECT, f08c47fec0942fa0`;
});
// router.post('/graphql', proxyMiddleware);

app.listen(3001, () => {
  console.log('SSR server is listening to http://localhost:3001');
});
