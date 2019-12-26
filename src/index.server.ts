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

const proxyMiddleware = proxy('localhost', { port: 5000 });
app.use(router.routes()).use(router.allowedMethods());

app.use(ssrMiddleware);
app.use(proxyMiddleware);
// router.post('/graphql', proxyMiddleware);

app.listen(3001, () => {
  console.log('SSR server is listening to http://localhost:3001');
});
